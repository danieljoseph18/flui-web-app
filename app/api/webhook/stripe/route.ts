import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Map Stripe subscription status to our database status
function mapSubscriptionStatus(stripeStatus: string): string {
  switch (stripeStatus) {
    case "trialing":
      return "trialing";
    case "active":
      return "active";
    case "incomplete":
    case "past_due":
      return "past_due";
    case "canceled":
    case "unpaid":
    case "incomplete_expired":
      return "inactive";
    default:
      return "inactive";
  }
}

async function updateUserSubscription(
  stripeCustomerId: string,
  customerEmail: string,
  subscriptionData: {
    subscriptionId: string;
    status: string;
    priceId?: string;
    currentPeriodEnd?: number;
  }
) {
  try {
    // First get the user by email
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("id, stripe_customer_id, email")
      .eq("email", customerEmail);

    if (userError) {
      console.error("Error fetching user:", userError);
      throw userError;
    }

    if (!users || users.length === 0) {
      console.error(`No user found with email: ${customerEmail}`);
      return;
    }

    const user = users[0];

    // If stripe_customer_id is not set, update it
    if (!user.stripe_customer_id) {
      const { error: updateCustomerIdError } = await supabase
        .from("users")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", user.id);

      if (updateCustomerIdError) {
        console.error(
          "Error updating stripe_customer_id:",
          updateCustomerIdError
        );
      }
    }

    // Map the Stripe status to our database status
    const mappedStatus = mapSubscriptionStatus(subscriptionData.status);

    // Update the user's subscription data
    const { error: updateError } = await supabase
      .from("users")
      .update({
        subscription_status: mappedStatus,
        subscription_id: subscriptionData.subscriptionId,
        subscription_price_id: subscriptionData.priceId,
        subscription_current_period_end: subscriptionData.currentPeriodEnd
          ? new Date(subscriptionData.currentPeriodEnd * 1000).toISOString()
          : null,
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating subscription:", updateError);
      throw updateError;
    }
  } catch (error) {
    console.error("Error in updateUserSubscription:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature || !webhookSecret) {
      return new NextResponse("Webhook signature or secret missing", {
        status: 400,
      });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new NextResponse("Webhook signature verification failed", {
        status: 400,
      });
    }

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get customer email from Stripe
        const customer = await stripe.customers.retrieve(customerId);
        if (!customer.deleted && customer.email) {
          await updateUserSubscription(customerId, customer.email, {
            subscriptionId: subscription.id,
            status: subscription.status,
            priceId: subscription.items.data[0]?.price.id,
            currentPeriodEnd: subscription.current_period_end,
          });
        }
        break;

      case "invoice.paid":
      case "invoice.payment_succeeded":
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription && invoice.customer) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );
          const customer = await stripe.customers.retrieve(
            invoice.customer as string
          );

          if (!customer.deleted && customer.email) {
            await updateUserSubscription(
              invoice.customer as string,
              customer.email,
              {
                subscriptionId: subscription.id,
                status: subscription.status,
                priceId: subscription.items.data[0]?.price.id,
                currentPeriodEnd: subscription.current_period_end,
              }
            );
          }
        }
        break;

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice;
        if (failedInvoice.subscription && failedInvoice.customer) {
          const subscription = await stripe.subscriptions.retrieve(
            failedInvoice.subscription as string
          );
          const customer = await stripe.customers.retrieve(
            failedInvoice.customer as string
          );

          if (!customer.deleted && customer.email) {
            await updateUserSubscription(
              failedInvoice.customer as string,
              customer.email,
              {
                subscriptionId: subscription.id,
                status: subscription.status,
                priceId: subscription.items.data[0]?.price.id,
                currentPeriodEnd: subscription.current_period_end,
              }
            );
          }
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Webhook handler failed", details: error }),
      { status: 500 }
    );
  }
}
