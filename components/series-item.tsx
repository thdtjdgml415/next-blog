import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function SeriesItem({
  title,
  description,
  slugAsParams,
}: {
  title: string;
  description?: string;
  slugAsParams: string;
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl">{title}</AccordionTrigger>
        <AccordionContent>{description}</AccordionContent>
        <AccordionContent>
          <Link href={`/blog/${slugAsParams}`} className="text-gray-400">
            자세히 보기
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
