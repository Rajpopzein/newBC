import SiteLayOut from "@/components/layout/siteLayout/SiteLayOut";
import { CardHeader, Typography } from "@mui/material";
// import { TextField } from "@mui/material";
import { RadioGroup, Radio, CardBody } from "@nextui-org/react";
import {
  Card,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { useState } from "react";

const CreateRulePage = () => {
  const [symboleOptions] = useState<string[]>(["SBIN", "RELIANCE"]);
  const [orderTypes] = useState<string[]>(["Live"]);
  const [strategySettings] = useState<string[]>(["indicator1", "indicator2"]);
  const [timeFrame] = useState<string[]>(["1m", "2m"]);
  const [targetType] = useState<string[]>(["Point", "Percentage"]);

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
                    {symboleOptions &&
                      symboleOptions.map((data, index) => (
                        <SelectItem value={data} key={index}>
                          {data}
                        </SelectItem>
                      ))}
                  </Select>
                  <Select label="Time Frame">
                    {timeFrame &&
                      timeFrame.map((data, index) => (
                        <SelectItem value={data} key={index}>
                          {data}
                        </SelectItem>
                      ))}
                  </Select>
                </div>

                <Select label="Order Type">
                  {orderTypes &&
                    orderTypes.map((data, index) => (
                      <SelectItem value={data} key={index}>
                        {data}
                      </SelectItem>
                    ))}
                </Select>
                <Select label="Strategy Option">
                  {strategySettings &&
                    strategySettings.map((data, index) => (
                      <SelectItem value={data} key={index}>
                        {data}
                      </SelectItem>
                    ))}
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
                      {timeFrame &&
                        timeFrame.map((data, index) => (
                          <SelectItem value={data} key={index}>
                            {data}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>
                  <Input label="Qty" name="qty" />
                  <div className="flex gap-3">
                    <Input label="Default" name="default" />
                    <Input label="Min" name="min" />
                    <Input label="Max" name="max" />
                    <Input label="Step" name="step" />
                  </div>
                  {/* <Select label="Order Type">
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </Select> */}
                </Card>
              </div>

              <Card className="p-3 flex gap-4 h-[100%]">
                <div className="flex w-full justify-between gap-4 mb-4">
                  <Card className="p-5 h-[100%] flex-1">
                    <Typography variant="subtitle1" className="mb-3">
                      Target Settings
                    </Typography>
                    <RadioGroup label="Mode" orientation="horizontal">
                      <Radio value={"true"}>Active</Radio>
                      <Radio value={"false"}>Disable</Radio>
                    </RadioGroup>
                    <Select label="Target Type" className="mt-4 mb-4">
                      {targetType &&
                        targetType.map((data, index) => (
                          <SelectItem value={data} key={index}>
                            {data}
                          </SelectItem>
                        ))}
                    </Select>
                    <Input label="Target Value" />
                  </Card>
                  <Card className="p-5 h-[100%] flex-1">
                    <Typography variant="subtitle1" className="mb-3">
                      Stoploss Settings
                    </Typography>
                    <RadioGroup label="Mode" orientation="horizontal">
                      <Radio value={"true"}>Active</Radio>
                      <Radio value={"false"}>Disable</Radio>
                    </RadioGroup>
                    <Select label="Stoploss Type" className="mt-4 mb-4">
                      {targetType &&
                        targetType.map((data, index) => (
                          <SelectItem value={data} key={index}>
                            {data}
                          </SelectItem>
                        ))}
                    </Select>
                    <Input label="Stoploss Value" />
                  </Card>
                  <Card className="p-5 h-[100%] flex-1">
                    <Typography variant="subtitle1" className="mb-3">
                      Trailing stoploss settings
                    </Typography>
                    <RadioGroup label="Mode" orientation="horizontal">
                      <Radio value={"true"}>Active</Radio>
                      <Radio value={"false"}>Disable</Radio>
                    </RadioGroup>
                    <Select label="Target Type" className="mt-4 mb-4">
                      {targetType &&
                        targetType.map((data, index) => (
                          <SelectItem value={data} key={index}>
                            {data}
                          </SelectItem>
                        ))}
                    </Select>
                    <Input label="Target Value" />
                  </Card>
                </div>

                {/* <div className="flex gap-3 mb-4">
                  <Input label="Target" />
                  <Input label="Stop loss" />
                  <Input label="Max loss" />
                  <Input label="Max Profit" />
                </div> */}
              </Card>
            </div>
            <div className="flex gap-3 mb-5">
              <Button>Create Strategy</Button>
              <Button>Run Strategy</Button>
            </div>
          </form>
        </div>
      </div>
    </SiteLayOut>
  );
};

export default CreateRulePage;
