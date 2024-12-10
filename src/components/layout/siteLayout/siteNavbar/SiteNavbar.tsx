import { List, ListItem } from "@mui/material";
import { PiStrategy } from "react-icons/pi";
const SiteNavbar = () => {
  
  return (
    <div className="w-[14%] h-[100%]  site-nabar">
        <List>
            <ListItem className="flex justify-between w-[100%] gap-5 list-menu-item active"><PiStrategy className="text-2xl"/> Create Strategy</ListItem>
            <ListItem className="flex justify-between w-[100%] gap-5 list-menu-item"><PiStrategy className="text-2xl"/> Create Strategy</ListItem>
            <ListItem className="flex justify-between w-[100%] gap-5 list-menu-item"><PiStrategy className="text-2xl"/> Create Strategy</ListItem>
        </List>
    </div>
  );
};

export default SiteNavbar;
