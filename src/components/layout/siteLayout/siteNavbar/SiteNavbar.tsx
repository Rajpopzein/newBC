import { List, ListItem } from "@mui/material";
import { PiStrategy } from "react-icons/pi";
import { useNavigate } from "react-router";
import { GiNanoBot } from "react-icons/gi";
interface activekey {
  active? : number
}

const SiteNavbar = ({active=1}:activekey) => {
  const navigate = useNavigate()
  return (
    <div className="w-[14%] site-nabar">
      <List>
        <ListItem onClick={()=>{navigate('/chart')}} className={`flex justify-between w-[100%] gap-5 list-menu-item ${active == 1 ? "active" : ""}`}>
          <PiStrategy className="text-2xl" /> Create Strategy
        </ListItem>
        <ListItem onClick={()=>{navigate('/runningbot')}} className={`flex justify-between w-[100%] gap-5 list-menu-item ${active == 2 ? "active" : ""}`}>
          <GiNanoBot className="text-2xl" /> Active Bots
        </ListItem>
        {/* <ListItem className={`flex justify-between w-[100%] gap-5 list-menu-item ${active == 3 ? "active" : ""}`}>
          <PiStrategy className="text-2xl" /> Create Strategy
        </ListItem> */}
      </List>
    </div>
  );
};

export default SiteNavbar;
