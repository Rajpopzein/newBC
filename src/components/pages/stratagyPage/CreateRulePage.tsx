import SiteLayOut from "@/components/layout/siteLayout/SiteLayOut";
import { ChangeEvent } from "react";
import { Typography } from "@mui/material";
// import { TextField } from "@mui/material";
import { RadioGroup, Radio } from "@nextui-org/react";
import {
  Card,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";

const CreateRulePage = () => {
  const [symboleOptions] = useState<string[]>(["SBIN", "RELIANCE"]);
  const [orderTypes] = useState<string[]>(["Live"]);
  const [strategySettings] = useState<string[]>(["supertrend"]);
  const [selectedStrategyOption, setSelectedStrategyOptions] =
    useState<any>("null");
  const [timeFrame] = useState<string[]>(["1m", "2m"]);
  const [targetType] = useState<string[]>(["Point", "Percentage"]);
  const [selectePeriod, setSelectPeriod] = useState<string>("null");
  const [selectFactor, setSelectFactor] = useState<string>("null");
  const [selectLookBack, setSelectLookBack] = useState<string>("null");
  const token = localStorage.getItem("token");

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
    },
    stratagy2: {
      name: "high_low",
      lookBack: "",
      lookBackOption: {
        default: "",
        min: "",
        max: "",
        step: "",
      },
    },
    qty: "",
    Pyramid: {
      default: "",
      min: "",
      max: "",
      step: "",
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

  const ruleValidation =Yup.object().shape( {
    strategyName: Yup.string().required("Strategy Name is required"),
    description: Yup.string().required("Description is required"),
    symboleSelection: Yup.array().of(Yup.string().oneOf(symboleOptions)).required("Symbol Selection is required"),
    timeFrame: Yup.string().required("Time Frame is required"),
    strategyMode: Yup.string().required("Strategy Mode is required"),
    strategyOption: Yup.string().required("Strategy Option is required"),
  })



  const handleSelectionChange = (e: ChangeEvent<any>) => {
    setSelectedStrategyOptions(e.target.value);
  };

  const handlePeriodChange = (e: ChangeEvent<any>) => {
    if (e.target.name === "stratagy1.atrPeriod")
      setSelectPeriod(e.target.value);
    if (e.target.name === "stratagy1.factor") setSelectFactor(e.target.value);
    if (e.target.name === "stratagy2.lookBack") setSelectLookBack(e.target.value);
  };

  const handleSubmit = async (data: unknown, resetForm: () => void) => {
    console.log(data);
    const stratagy = await axios.post("http://localhost:8000/data", data, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    if (stratagy.status === 200) {
      resetForm();
      toast.success("Stratagy Created Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log(stratagy);
  };

  return (
    <SiteLayOut>
      <div className="w-full p-[3%]">
        <div className="w-full h-full flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Create Strategy</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={ruleValidation}
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, resetForm)
            }
          >
            {({ values, handleChange, errors, touched, }) => (
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
                        isInvalid={!!errors.strategyName && touched.strategyName}
                        errorMessage={errors.strategyName}
                      />
                      <Textarea
                        maxRows={4}
                        className="w-full: h-fit"
                        label="Description"
                        name="description"
                        onChange={handleChange}
                        value={values.description}
                        isInvalid={!!errors.description && touched.description}
                        errorMessage={errors.description}
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
                        isInvalid={!!errors.symboleSelection && touched.symboleSelection}
                        errorMessage={errors.symboleSelection}
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
                        isInvalid={!!errors.timeFrame && touched.timeFrame}
                        errorMessage={errors.timeFrame}
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
                      isInvalid={!!errors.strategyMode && touched.strategyMode}
                      errorMessage={errors.strategyMode}
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
                      isInvalid={!!errors.strategyOption && touched.strategyOption}
                      errorMessage={errors.strategyOption}
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
                      selectedStrategyOption === "supertrend" && (
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
                              <Card className="p-3 flex-1">
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
                              <Card className="p-3 flex-1">
                                <div className="flex gap-3 flex-1">
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
                          {/* <div>
                            <Input
                              label="Qty"
                              className="mb-4"
                              name="stratagy1.qty"
                              value={values.stratagy1.qty}
                              onChange={handleChange}
                            />
                          </div> */}

                          {/* </Card>
                      )}
                    {selectedStrategyOption === "stratagy 2" && (
                      <Card className="p-3 flex gap-4"> */}
                          {/* <div className="flex gap-3">
                          <Input
                            label="Name"
                            className="mb-1"
                            name="stratagy2.name"
                            value={values.stratagy2.name}
                            onChange={handleChange}
                          />
                        </div> */}
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
                            {selectLookBack != "null" && selectLookBack != "" && (
                              <Card className="p-3 flex-1">
                                <div className="flex gap-3">
                                  <Input
                                    label="Default"
                                    name="stratagy2.lookBackOption.default"
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
                                name="Pyramid.default"
                                value={values.Pyramid.default}
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
                          <Radio value="true">Active</Radio>
                          <Radio value="false">Disable</Radio>
                        </RadioGroup>
                        <Select
                          label="Target Type"
                          className="mt-4 mb-4"
                          name="targetSettings.type"
                          value={values.targetSettings.type}
                          onChange={handleChange}
                          isDisabled={values.targetSettings.mode==="false" ? true : false}
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
                          isDisabled={values.targetSettings.mode==="false" ? true : false}
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
                          <Radio value="true">Active</Radio>
                          <Radio value="false">Disable</Radio>
                        </RadioGroup>
                        <Select
                          label="Stoploss Type"
                          className="mt-4 mb-4"
                          name="stoplossSettings.type"
                          value={values.stoplossSettings.type}
                          onChange={handleChange}
                          isDisabled={values.stoplossSettings.mode==="false" ? true : false}
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
                          isDisabled={values.stoplossSettings.mode==="false" ? true : false}
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
                          defaultValue={"false"}
                        >
                          <Radio value="true">Active</Radio>
                          <Radio value="false">Disable</Radio>
                        </RadioGroup>
                        <Select
                          label="Target Type"
                          className="mt-4 mb-4"
                          name="trailingStoplossSettings.type"
                          value={values.trailingStoplossSettings.type}
                          onChange={handleChange}
                          isDisabled={values.trailingStoplossSettings.mode==="false" ? true : false}
                        >
                          {targetType &&
                            targetType.map((data) => (
                              <SelectItem value={data} key={data}>
                                {data}
                              </SelectItem>
                            ))}
                        </Select>
                        <Input
                          label="Target Value"
                          name="trailingStoplossSettings.value"
                          value={values.trailingStoplossSettings.value}
                          onChange={handleChange}
                          isDisabled={values.trailingStoplossSettings.mode==="false" ? true : false}
                        />
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
                  {/* <Button>Run Strategy</Button> */}
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
