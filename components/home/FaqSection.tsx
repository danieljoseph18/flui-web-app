import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/app/lib/data";

const FaqSection = () => {
  return (
    <section
      id="faq"
      className="bg-subtle-gray py-8 md:py-12 lg:py-24 px-4 lg:px-48"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 md:text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="mx-auto max-w-[58rem] mt-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
