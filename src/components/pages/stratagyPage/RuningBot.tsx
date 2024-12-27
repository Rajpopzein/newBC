import SiteLayOut from "@/components/layout/siteLayout/SiteLayOut";
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";

const RuningBot = () => {
  const [strategyData, setStrategyData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const dtrat = async () => {
      const datas = await axios.get("http://localhost:8000/dataById", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      if (datas.status === 200) {
        setStrategyData(datas.data);
      }
    };
    dtrat();
  }, []);

  return (
    <SiteLayOut activeSidebar={2}>
      <div className="p-5">
        <Typography variant="h6">User Created Strategy</Typography>
        <div className="grid grid-cols-3 gap-4">
          {strategyData.map((value, index) => (
            <Card key={index} className="p-5 mb-3 flex-1 ">
              <div className="mb-2">
                <Typography variant="subtitle1" className="font-bold">Strategy Name</Typography>
              <Typography variant="caption">
                {value?.stratagyData?.strategyName}
              </Typography>
              </div>
              <div className="mb-2">
              <Typography variant="subtitle1">Strategy description</Typography>
              <Typography variant="caption" className="text-wrap">
                {value?.stratagyData?.description}
              </Typography>
              </div>
              <div className="mb-2">
              <Typography variant="subtitle1">Strategy mode</Typography>
              <Typography variant="caption">
                {value?.stratagyData?.strategyMode}
              </Typography>
              </div>
              <div className="mb-2">
              <Typography variant="subtitle1">Symbole Selection</Typography>
              <Typography variant="caption">
                {value?.stratagyData?.symboleSelection}
              </Typography>
              </div>
              
            </Card>
          ))}
        </div>
      </div>
    </SiteLayOut>
  );
};

export default RuningBot;
