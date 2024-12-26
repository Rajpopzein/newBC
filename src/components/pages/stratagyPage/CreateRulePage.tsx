import SiteLayOut from "@/components/layout/siteLayout/SiteLayOut";
import { ChangeEvent } from "react";
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
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

const CreateRulePage = () => {
  const [symboleOptions] = useState<string[]>(["SBIN", "RELIANCE"]);
  const [orderTypes] = useState<string[]>(["Live"]);
  const [strategySettings] = useState<string[]>(["stratagy 1", "stratagy 2"]);
  const [selectedStrategyOption, setSelectedStrategyOptions] =
    useState<any>("null");
  const [timeFrame] = useState<string[]>(["1m", "2m"]);
  const [targetType] = useState<string[]>(["Point", "Percentage"]);
  const [selectePeriod, setSelectPeriod] = useState<string>("null");
  const [selectFactor, setSelectFactor] = useState<string>("null");

  const initialValues = {
    strategyName: "",
    description: "",
    symboleSelection: [],
    timeFrame: "",
    strategyMode: "",
    strategyOption: "",
    stratagy1: {
      name: "",
      atrPeriod: "",
      atrPeriodOption: {
        default: "",
        min: "",
        max: "",
        step: "",
      },
      factor: "",
      factorOption: {
        default: "",
        min: "",
        max: "",
        step: "",
      },
      qty: "",
      Pyramid: {
        default: "",
        min: "",
        max: "",
        step: "",
      },
    },
    stratagy2: {
      name: "",
      lookBack: "",
      lookBackOption: {
        default: "",
        min: "",
        max: "",
        step: "",
      },
      qty: "",
      Pyramid: {
        default: "",
        min: "",
        max: "",
        step: "",
      },
    },
    targetSettings: {
      mode: "false",
      type: "",
      value: "",
    },
    stoplossSettings: {
      mode: "false",
      type: "",
      value: "",
    },
    trailingStoplossSettings: {
      mode: "false",
      type: "",
      value: "",
    },
  };

  const handleSelectionChange = (e: ChangeEvent<any>) => {
    setSelectedStrategyOptions(e.target.value);
  };

  const handlePeriodChange = (e: ChangeEvent<any>) => {
    if (e.target.name === "Setting1") setSelectPeriod(e.target.value);
    if (e.target.name === "setting2") setSelectFactor(e.target.value);
  };

  const handleSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <SiteLayOut>
      <div className="w-full p-[3%]">
        <div className="w-full h-full flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Create Strategy</h1>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <div className="grid grid-cols-2 gap-[1%] w-full">
                  <Card className="p-3">
                    <div>
                      <Input
                        label="Strategy Name"
                        name="strategyName"
                        className="mb-4"
                        value={values.strategyName}
                        onChange={handleChange}
                        
                      />
                      <Textarea
                        maxRows={4}
                        className="w-full: h-fit"
                        label="Description"
                        name="description"
                        onChange={handleChange}
                        value={values.description}
                      />
                    </div>
                  </Card>
                  <Card className="w-full p-3 flex gap-4">
                    <div className="flex gap-3">
                      <Select
                        label="Symbole Selection"
                        selectionMode="multiple"
                        name="symboleSelection"
                        onChange={handleChange}
                        value={values.symboleSelection}
                      >
                        {symboleOptions &&
                          symboleOptions.map((data) => (
                            <SelectItem key={data}>{data}</SelectItem>
                          ))}
                      </Select>
                      <Select
                        label="Time Frame"
                        name="timeFrame"
                        onChange={handleChange}
                        value={values.timeFrame}
                      >
                        {timeFrame &&
                          timeFrame.map((data) => (
                            <SelectItem key={data}>{data}</SelectItem>
                          ))}
                      </Select>
                    </div>

                    <Select
                      label="Strategy Mode"
                      name="strategyMode"
                      onChange={handleChange}
                      value={values.strategyMode}
                    >
                      {orderTypes &&
                        orderTypes.map((data) => (
                          <SelectItem value={data} key={data}>
                            {data}
                          </SelectItem>
                        ))}
                    </Select>
                    <Select
                      label="Strategy Option"
                      // selectionMode="multiple"
                      name="strategyOption"
                      value={values.strategyOption}
                      onChange={(e) => {
                        handleSelectionChange(e);
                        handleChange(e);
                      }}
                    >
                      {strategySettings &&
                        strategySettings.map((data) => (
                          <SelectItem key={data}>{data}</SelectItem>
                        ))}
                    </Select>
                  </Card>
                </div>
                <div className="mt-6 grid gap-[1%] mb-4">
                  <div className="grid grid-cols-1 gap-[1%] mb-4">
                    {selectedStrategyOption &&
                      selectedStrategyOption === "stratagy 1" && (
                        <Card className="p-3 flex gap-4">
                          <div className="flex gap-3">
                            <Input
                              label="Name"
                              className="mb-1"
                              name="stratagy1.name"
                              value={values.stratagy1.name}
                              onChange={handleChange}
                            />
                          </div>
                          {/* <Input label="Qty" name="qty" /> */}
                          <div className="flex gap-4">
                            <Select
                              label="ATR Period"
                              name="stratagy1.atrPeriod"
                              value={values.stratagy1.atrPeriod}
                              onChange={(e) => {
                                handlePeriodChange(e);
                                handleChange(e);
                              }}
                            >
                              <SelectItem value="atr_period" key="atr_period">
                                atr_period
                              </SelectItem>
                            </Select>
                            <Select
                              label="Factor"
                              name="stratagy1.factor"
                              value={values.stratagy1.factor}
                              onChange={(e) => {
                                handlePeriodChange(e);
                                handleChange(e);
                              }}
                            >
                              <SelectItem value="factor" key="factor">
                                factor
                              </SelectItem>
                            </Select>
                          </div>
                          <div className="flex gap-3">
                            {selectePeriod != "null" && selectePeriod != "" && (
                              <Card className="p-3">
                                <div className="flex gap-3">
                                  <Input
                                    label="Default"
                                    name="stratagy1.atrPeriodOption.default"
                                    value={
                                      values.stratagy1.atrPeriodOption.default
                                    }
                                    onChange={handleChange}
                                  />
                                  {/* <Input label="Min" name="min" />
                                  <Input label="Max" name="max" />
                                  <Input label="Step" name="step" /> */}
                                </div>
                              </Card>
                            )}
                            {selectFactor != "null" && selectFactor != "" && (
                              <Card className="p-3">
                                <div className="flex gap-3">
                                  <Input
                                    label="Default"
                                    name="stratagy1.factorOption.default"
                                    value={
                                      values.stratagy1.factorOption.default
                                    }
                                    onChange={handleChange}
                                  />
                                  {/* <Input label="Min" name="min" />
                                  <Input label="Max" name="max" />
                                  <Input label="Step" name="step" /> */}
                                </div>
                              </Card>
                            )}
                          </div>
                          <div>
                            <Input
                              label="Qty"
                              className="mb-4"
                              name="stratagy1.qty"
                              value={values.stratagy1.qty}
                              onChange={handleChange}
                            />
                          </div>
                          <Card className="p-3">
                            <p className="text-small text-default-500 mb-2">
                              Pyramid
                            </p>
                            <div className="flex gap-3">
                              <Input
                                label="Default"
                                name="stratagy1.Pyramid.default"
                                value={values.stratagy1.Pyramid.default}
                                onChange={handleChange}
                              />
                              {/* <Input label="Min" name="min" />
                              <Input label="Max" name="max" />
                              <Input label="Step" name="step" /> */}
                            </div>
                          </Card>
                        </Card>
                      )}
                    {selectedStrategyOption === "stratagy 2" && (
                      <Card className="p-3 flex gap-4">
                        <div className="flex gap-3">
                          <Input
                            label="Name"
                            className="mb-1"
                            name="stratagy2.name"
                            value={values.stratagy2.name}
                            onChange={handleChange}
                          />
                        </div>
                        {/* <Input label="Qty" name="qty" /> */}
                        <div className="flex gap-4">
                          <Select
                            label="Look Back"
                            name="stratagy2.lookBack"
                            value={values.stratagy2.lookBack}
                            onChange={(e) => {
                              handlePeriodChange(e);
                              handleChange(e);
                            }}
                          >
                            <SelectItem value="lookback" key="lookback">
                              lookback
                            </SelectItem>
                          </Select>
                        </div>

                        <div className="flex gap-3">
                          {selectePeriod != "null" && selectePeriod != "" && (
                            <Card className="p-3">
                              <div className="flex gap-3">
                                <Input
                                  label="Default"
                                  name="default"
                                  value={
                                    values.stratagy2.lookBackOption.default
                                  }
                                  onChange={handleChange}
                                />
                                {/* <Input label="Min" name="min" />
                                <Input label="Max" name="max" />
                                <Input label="Step" name="step" /> */}
                              </div>
                            </Card>
                          )}
                        </div>
                        <Input label="Qty" className="mb-4" />
                        <Card className="p-3">
                          <p className="text-small text-default-500 mb-2">
                            Pyramid
                          </p>
                          <div className="flex gap-3">
                            <Input
                              label="Default"
                              name="stratagy2.Pyramid.default"
                              value={values.stratagy2.Pyramid.default}
                              onChange={handleChange}
                            />
                            {/* <Input label="Min" name="min" />
                            <Input label="Max" name="max" />
                            <Input label="Step" name="step" /> */}
                          </div>
                        </Card>
                      </Card>
                    )}
                  </div>

                  <Card className="p-3 flex gap-4 h-[100%]">
                    <div className="flex w-full justify-between gap-4 mb-4">
                      <Card className="p-4 h-[100%] flex-1">
                        <Typography variant="subtitle1" className="mb-3">
                          Target Settings
                        </Typography>
                        <RadioGroup
                          label="Mode"
                          orientation="horizontal"
                          name="targetSettings.mode"
                          // defaultValue={values.targetSettings.mode}
                          value={values.targetSettings.mode}
                          onChange={(e) => handleChange(e)}
                        >
                          <Radio value={"true"}>Active</Radio>
                          <Radio value={"false"}>Disable</Radio>
                        </RadioGroup>
                        <Select
                          label="Target Type"
                          className="mt-4 mb-4"
                          name="targetSettings.type"
                          value={values.targetSettings.type}
                          onChange={handleChange}
                        >
                          {targetType &&
                            targetType.map((data) => (
                              <SelectItem key={data}>{data}</SelectItem>
                            ))}
                        </Select>
                        <Input
                          label="Target Value"
                          name="targetSettings.value"
                          value={values.targetSettings.value}
                          onChange={handleChange}
                        />
                      </Card>
                      <Card className="p-4 h-[100%] flex-1">
                        <Typography variant="subtitle1" className="mb-3">
                          Stoploss Settings
                        </Typography>
                        <RadioGroup
                          label="Mode"
                          orientation="horizontal"
                          name="stoplossSettings.mode"
                          value={values.stoplossSettings.mode}
                          onChange={(e) => handleChange(e)}
                        >
                          <Radio value={"true"}>Active</Radio>
                          <Radio value={"false"}>Disable</Radio>
                        </RadioGroup>
                        <Select
                          label="Stoploss Type"
                          className="mt-4 mb-4"
                          name="stoplossSettings.type"
                          value={values.stoplossSettings.type}
                          onChange={handleChange}
                        >
                          {targetType &&
                            targetType.map((data) => (
                              <SelectItem key={data}>{data}</SelectItem>
                            ))}
                        </Select>
                        <Input
                          label="Stoploss Value"
                          name="stoplossSettings.value"
                          value={values.stoplossSettings.value}
                          onChange={handleChange}
                        />
                      </Card>
                      <Card className="p-4 h-[100%] flex-1">
                        <Typography variant="subtitle1" className="mb-3">
                          Trailing stoploss settings
                        </Typography>
                        <RadioGroup
                          label="Mode"
                          orientation="horizontal"
                          name="trailingStoplossSettings.mode"
                          value={values.trailingStoplossSettings.mode}
                          onChange={(e) => handleChange(e)}
                        >
                          <Radio value={"true"}>Active</Radio>
                          <Radio value={"false"}>Disable</Radio>
                        </RadioGroup>
                        <Select
                          label="Target Type"
                          className="mt-4 mb-4"
                          name="trailingStoplossSettings.type"
                          value={values.trailingStoplossSettings.type}
                          onChange={handleChange}
                          isDisabled={!Boolean(values.trailingStoplossSettings.mode)}
                        >
                          {targetType &&
                            targetType.map((data) => (
                              <SelectItem value={data} key={data}>
                                {data}
                              </SelectItem>
                            ))}
                        </Select>
                        <Input label="Target Value" name="trailingStoplossSettings.value" value={values.trailingStoplossSettings.value} onChange={handleChange}/>
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
                  <Button type="submit">Create Strategy</Button>
                  <Button>Run Strategy</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </SiteLayOut>
  );
};

export default CreateRulePage;
