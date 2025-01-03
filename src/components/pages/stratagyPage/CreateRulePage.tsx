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
    user_id: token.email,
    broker: {
      name: "zerodha",
      user: "EZD562",
      api_key: "1234",
      api_secret: "1234",
      password: "1234",
      totp_key: "ASIGDAGFIABF",
    },
    exchange: "paper",
    strategyName: "",
    description: "",
    symbole: [],
    timeFrame: "",
    type: "",
    bot_name: "",
    indicator1: {
      name: "",
      atrPeriodOption: "",
      atrPeriod: {
        default: [],
        min: 0,
        max: 0,
        step: 0,
      },
      factorOption: "",
      factor: {
        default: [],
        min: 0,
        max: 0,
        step: 0,
      },
    },
    indicator2: {
      name: "high_low",
      lookBackOption: "",
      lookBack: {
        default: [],
        min: 0,
        max: 0,
        step: 0,
      },
    },
    qty: null,
    Pyramid: {
      default: 0,
      min: "",
      max: "",
      step: "",
    },
    targetSettings: {
      mode: "false",
      target_type: "",
      value: null,
    },
    stoplossSettings: {
      mode: "false",
      stoploss_type: "",
      value: null,
    },
    trailingStoplossSettings: {
      mode: "false",
      stoploss_type: "",
      value: null,
    },
    logs:"true",
    print: "true"
  };

  const ruleValidation = Yup.object().shape({
    strategyName: Yup.string().required("Strategy Name is required"),
    description: Yup.string().required("Description is required"),
    symbole: Yup.array().required("Symbol Selection is required"),
    timeFrame: Yup.string().required("Time Frame is required"),
    type: Yup.string().required("Strategy Mode is required"),
    bot_name: Yup.string().required("Strategy Option is required"),

  });

  const handleSelectionChange = (e: ChangeEvent<any>) => {
    setSelectedStrategyOptions(e.target.value);
  };

  const handlePeriodChange = (e: ChangeEvent<any>) => {
    if (e.target.name === "indicator1.atrPeriodOption")
      setSelectPeriod(e.target.value);
    if (e.target.name === "indicator1.factorOption")
      setSelectFactor(e.target.value);
    if (e.target.name === "indicator2.lookBackOption")
      setSelectLookBack(e.target.value);
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
            {({ values, handleChange, errors, touched, setFieldValue }) => (
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
                        isInvalid={
                          !!errors.strategyName && touched.strategyName
                        }
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
                        name="symbole"
                        onChange={(e) => {
                          console.log(e.target.value);
                          const splitedValue = [
                            ...new Set(e.target.value.split(",")),
                          ];

                          // Set the new unique values to the form field
                          setFieldValue("symbole", splitedValue);
                        }}
                        value={values.symbole}
                        isInvalid={
                          !!errors.symbole && touched.symbole
                        }
                        errorMessage={errors.symbole}
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
                      name="type"
                      onChange={handleChange}
                      value={values.type}
                      isInvalid={!!errors.type && touched.type}
                      errorMessage={errors.type}
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
                      name="bot_name"
                      value={values.bot_name}
                      onChange={(e) => {
                        handleSelectionChange(e);
                        handleChange(e);
                      }}
                      isInvalid={
                        !!errors.bot_name && touched.bot_name
                      }
                      errorMessage={errors.bot_name}
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
                              name="indicator1.name"
                              value={values.indicator1.name}
                              onChange={handleChange}
                            />
                          </div>
                          {/* <Input label="Qty" name="qty" /> */}
                          <div className="flex gap-4">
                            <Select
                              label="ATR Period"
                              name="indicator1.atrPeriodOption"
                              value={values.indicator1.atrPeriodOption}
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
                              name="indicator1.factorOption"
                              value={values.indicator1.factorOption}
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
                                    name="indicator1.atrPeriod.default"
                                    value={values.indicator1.atrPeriod.default[0]}
                                    type="number"
                                    onChange={(e)=>{
                                      const updatedvalue = [...values.indicator1.atrPeriod.default]
                                      updatedvalue[0] = parseInt(e.target.value)
                                      console.log(updatedvalue)
                                      setFieldValue("indicator1.atrPeriod.default", updatedvalue); 
                                    }}
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
                                    name="indicator1.factor.default"
                                    value={values.indicator1.factor.default[0]}
                                    type="number"
                                    onChange={(e)=>{
                                      const updatedvalue = [...values.indicator1.factor.default]
                                      updatedvalue[0] = parseInt(e.target.value)
                                      console.log(updatedvalue)
                                      setFieldValue("values.indicator1.factor.default", updatedvalue); 
                                    }}
                                 />
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
                              name="indicator2.lookBackOption"
                              value={values.indicator2.lookBackOption}
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
                            {selectLookBack != "null" &&
                              selectLookBack != "" && (
                                <Card className="p-3 flex-1">
                                  <div className="flex gap-3">
                                    <Input
                                      label="Default"
                                      name="indicator2.lookBack.default"
                                      value={values.indicator2.lookBack.default[0]}
                                      type="number"
                                      onChange={(e)=>{
                                        const updatedvalue = [...values.indicator1.factor.default]
                                        updatedvalue[0] = parseInt(e.target.value)
                                        console.log(updatedvalue)
                                        setFieldValue("indicator2.lookBack.default", updatedvalue); 
                                      }}
                                    />
                                    {/* <Input label="Min" name="min" />
                                <Input label="Max" name="max" />
                                <Input label="Step" name="step" /> */}
                                  </div>
                                </Card>
                              )}
                          </div>
                          <Input label="Qty" className="mb-4" name="qty" value={values.qty} onChange={handleChange} type="number"/>
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
                          name="targetSettings.target_type"
                          value={values.targetSettings.target_type}
                          onChange={handleChange}
                          isDisabled={
                            values.targetSettings.mode === "false"
                              ? true
                              : false
                          }
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
                          type="number"
                          isDisabled={
                            values.targetSettings.mode === "false"
                              ? true
                              : false
                          }
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
                          name="stoplossSettings.stoploss_type"
                          value={values.stoplossSettings.stoploss_type}
                          onChange={handleChange}
                          isDisabled={
                            values.stoplossSettings.mode === "false"
                              ? true
                              : false
                          }
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
                          type="number"
                          onChange={handleChange}
                          isDisabled={
                            values.stoplossSettings.mode === "false"
                              ? true
                              : false
                          }
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
                          name="trailingStoplossSettings.stoploss_type"
                          value={values.trailingStoplossSettings.stoploss_type}
                          onChange={handleChange}
                          isDisabled={
                            values.trailingStoplossSettings.mode === "false"
                              ? true
                              : false
                          }
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
                          type="number"
                          onChange={handleChange}
                          isDisabled={
                            values.trailingStoplossSettings.mode === "false"
                              ? true
                              : false
                          }
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
