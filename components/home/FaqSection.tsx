import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/app/lib/content/faqs";

const FaqSection = () => {
  return (
    <section
      id="faq"
      className="bg-subtle-gray py-8 md:py-12 lg:py-24 px-4 xl:px-48"
    >
      <div className="flex flex-col items-center justify-center gap-4 md:text-center">
        <h2 className="text-3xl font-bold leading-[1.1] md:text-5xl">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-bold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
