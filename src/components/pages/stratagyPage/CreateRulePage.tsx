import SiteLayOut from "@/components/layout/siteLayout/SiteLayOut";
// import { TextField } from "@mui/material";
import { Card, Input, Textarea, Select, SelectItem, Button } from "@nextui-org/react";

const CreateRulePage = () => {
  return (
    <SiteLayOut>
      <div className="w-full p-[3%]">
        <div className="w-full h-full flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Create Strategy</h1>
          <form>
            <div className="grid grid-cols-2 gap-[1%] w-full">
              <Card className="p-3">
                <div>
                  <Input label="Strategy Name" className="mb-4" />
                  <Textarea
                    maxRows={4}
                    className="w-full: h-fit"
                    label="Description"
                  />
                </div>
              </Card>
              <Card className="w-full p-3 flex gap-4">
                <div className="flex gap-3">
                  <Select label="Symbole Selection">
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </Select>
                  <Select label="Time Frame">
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </Select>
                </div>

                <Select label="Order Type">
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </Select>
                <Select label="Strategy Option">
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </Select>
              </Card>
            </div>
            <div className="mt-6 grid gap-[1%] mb-4">
              <div className="grid grid-cols-2 gap-[1%] mb-4">
                {/* <Card className="p-3 flex gap-4">
                  <div className="flex gap-3">
                    <Select label="Symbole Selection">
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </Select>
                    <Select label="Time Frame">
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </Select>
                  </div>

                  <Select label="Order Type">
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </Select>
                </Card> */}
                <Card className="p-3 flex gap-4">
                  <div className="flex gap-3">
                    <Select label="Symbole Selection">
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </Select>
                    <Select label="Time Frame">
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </Select>
                  </div>

                  <Select label="Order Type">
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </Select>
                </Card>
              </div>

              <Card className="w p-3 flex gap-4 h-[100%]">
                <div className="flex gap-3">
                  <Input label="Target" />
                  <Input label="Stop loss" />
                  <Input label="Max loss" />
                  <Input label="Max Profit" />
                </div>
              </Card>
            </div>
            <Button>Create Strategy</Button>
          </form>
        </div>
      </div>
    </SiteLayOut>
  );
};

export default CreateRulePage;
