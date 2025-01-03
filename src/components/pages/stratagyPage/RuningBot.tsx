import SiteLayOut from "@/components/layout/siteLayout/SiteLayOut";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import { Button } from "rsuite";
import { toast } from "react-toastify";
import api from "../../../config/AxiosConfig.js"

const RuningBot = () => {
  const [strategyData, setStrategyData] = useState([]);
  const [strategyStart, setStrategyStart] = useState(false);

  useEffect(() => {
    const dtrat = async () => {
      const datas = await api.get("http://localhost:8000/dataById");
      if (datas.status === 200) {
        setStrategyData(datas.data);
      }
    };
    dtrat();
  }, []);

  const handlebotRun = async (value) => {
    try {
      const response = await api.post("http://localhost:8000/start", value);
      if (response.status === 200) {
        toast.success("Bot started successfully");
        setStrategyStart(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlebotstop = async (value) => {
    const userid = value.params.user_id;
    const strategy_name = value.params.strategyName;
    const bot_name = value.params.bot_name;

    const payload = {
      params: {
        user_id: userid,
        strategy_name: strategy_name,
        bot_name: bot_name,
      },
    };

    try {
      const response = await api.post("http://localhost:8000/stop", payload);
      if (response.status === 200) {
        toast.success("Bot stoped successfully");
        setStrategyStart(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SiteLayOut activeSidebar={2}>
      <div className="p-5 runbotmain">
        <Typography variant="h6">User Created Strategy</Typography>
        <div className="grid grid-cols-3 gap-4">
          {strategyData.map((value, index) => (
            <Card key={index} className="p-5 mb-3 flex-1 ">
              <div className="mb-2">
                <Typography variant="subtitle1" className="font-bold">
                  Strategy Name
                </Typography>
                <Typography variant="caption">
                  {value?.stratagyData?.params?.strategyName}
                </Typography>
              </div>
              <div className="mb-2">
                <Typography variant="subtitle1">
                  Strategy description
                </Typography>
                <Typography variant="caption" className="text-wrap">
                  {value?.stratagyData?.params?.description}
                </Typography>
              </div>
              <div className="mb-2">
                <Typography variant="subtitle1">Strategy mode</Typography>
                <Typography variant="caption">
                  {value?.stratagyData?.params?.type}
                </Typography>
              </div>
              <div className="mb-2">
                <Typography variant="subtitle1">Symbole Selection</Typography>
                <Typography variant="caption">
                  {value?.stratagyData?.params?.symbole}
                </Typography>
              </div>
              <div className="w-full">
                <Button
                  className={`w-full ${strategyStart ? "stopbtn" : "runbtn"}`}
                  appearance="primary"
                  onClick={() => {
                    strategyStart
                      ? handlebotstop(value.stratagyData)
                      : handlebotRun(value.stratagyData);
                  }}
                >
                  {strategyStart ? "Stop" : "Run Strategy"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SiteLayOut>
  );
};

export default RuningBot;
