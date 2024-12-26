import { List, ListItem } from "@mui/material";
import { PiStrategy } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { BsFillClipboard2DataFill } from "react-icons/bs";

interface siteNavbarInterface {
  isAdmin?: boolean;
}

const SiteNavbar = ({isAdmin}:siteNavbarInterface) => {
  return (
    <div className="w-[14%] site-nabar">
      {isAdmin ? (<List>
        <ListItem className="flex justify-between w-[100%] gap-3 list-menu-item active">
          <FaUsers className="text-2xl" /> Users Management
        </ListItem>
        <ListItem className="flex justify-between w-[100%] gap-3 list-menu-item">
          <BsFillClipboard2DataFill className="text-2xl" /> Data Management
        </ListItem>
        <ListItem className="flex justify-between w-[100%] gap-3 list-menu-item">
          <PiStrategy className="text-2xl" /> Create Strategy
        </ListItem>
      </List>):(<List>
        <ListItem className="flex justify-between w-[100%] gap-3 list-menu-item active">
          <PiStrategy className="text-2xl" /> Create Strategy
        </ListItem>
        <ListItem className="flex justify-between w-[100%] gap-3 list-menu-item">
          <PiStrategy className="text-2xl" /> Create Strategy
        </ListItem>
        <ListItem className="flex justify-between w-[100%] gap-3 list-menu-item">
          <PiStrategy className="text-2xl" /> Create Strategy
        </ListItem>
      </List>)}
      
    </div>
  );
};

export default SiteNavbar;
