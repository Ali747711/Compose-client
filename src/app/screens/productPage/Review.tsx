import { Accordion, AccordionItem } from "@heroui/react";

const Review = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <div className=" mt-16 flex">
      <div className="w-full  ">
        <Accordion selectionMode="single" isCompact={true} variant="bordered">
          <AccordionItem
            key="1"
            aria-label="Details"
            subtitle="Press to expand"
            title="Details"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            subtitle="Press to expand"
            title="Convention and storage"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            subtitle="Press to expand"
            title="Ingredients"
          >
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Review;
