import Navbar from "@/components/landingpage/Navbar";
import { Typography } from "@mui/material";
import { Accordion, AccordionItem, Card, Button } from "@nextui-org/react";
import { FaMessage } from "react-icons/fa6";

const FaqPage = () => {
  
  return (
    <div>
      <Navbar index={3} />
      <div className="faq-main p-[2.5rem]">
        <Typography variant="h3" className="font-bold w-[45%] header">
          Fequently asked questions
        </Typography>
        <div className="flex mt-[1.5%] gap-[10%]">
          <div className="w-[55%]">
            <Accordion defaultExpandedKeys={["1"]} variant="splitted">
              <AccordionItem
                key="1"
                // aria-label="Accordion 1"
                // aria-label=
                title="What is Proprietary Trading at BullsCatch?"
              >
                Proprietary trading at BullsCatch allows traders to initially
                trade using their own capital. Once they pass our ability test
                and demonstrate consistent performance, they are gradually
                allocated firm capital to trade with.
              </AccordionItem>
              <AccordionItem
                key="2"
                title="How does BullsCatch help traders succeed?"
              >
                BullsCatch provides traders with access to real-time market
                data, high-speed execution systems, mentorship, and educational
                resources to develop their skills in technical analysis, market
                psychology, and risk management.
              </AccordionItem>
              <AccordionItem key="3" title="How do I qualify for firm capital?">
                To qualify for firm capital, you need to trade using your own
                funds initially. After passing our ability test, which evaluates
                your performance and risk management, you will be allotted firm
                capital in phases.
              </AccordionItem>
              <AccordionItem
                key="4"
                title="What tools and technology does BullsCatch provide?"
              >
                BullsCatch offers advanced trading platforms, real-time market
                data, and fast execution systems to support your trading
                efforts, especially as you transition to using firm capital.
              </AccordionItem>
              <AccordionItem
                key="5"
                title="How does BullsCatch manage risk for prop traders?"
              >
                No, BullsCatch caters to traders of all experience levels. We
                provide the resources and support needed for beginners to grow
                while giving experienced traders the tools to enhance their
                strategies.
              </AccordionItem>
            </Accordion>
          </div>
          <Card className="more-question w-[30%] h-[22rem] flex p-6 justify-center ">
            <FaMessage className="more-question-icon" />
            <Typography
              variant="h5"
              className="font-bold mt-[1.5%] more-question-heading"
            >
              Discover how we help you manage your finances.
            </Typography>
            <Typography
              variant="subtitle2"
              className="font-bold mt-[1.5%] subtext"
            >
              End-to-end payments and financial management in a single solution.
              Meet the right platform to help realize.
            </Typography>
            <Button className="mt-[1.5%] email-btn" variant="ghost">
              Direct Mail
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
