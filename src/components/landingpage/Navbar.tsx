import { Button } from "@mui/material";
import logo from "../../assets/Bulls-catch-logo-transparent.png"
import { useNavigate } from "react-router";
import ModelContact from "./modelContact/ModelContact";
import { useState } from "react";

interface active {
  index? : number;
}

const Navbar = (props:active) => {
  const navigate = useNavigate()
  const [contactTrigger, setContactTrigger] = useState<boolean>(false)
  return (
    <div className="landingpage-navmain">
      <ModelContact isOpen={contactTrigger} onClose={setContactTrigger}/>
      <div style={{width:'66px', height:'33px'}}>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="navlist">
        <ul>
          <li className={props.index == 1 ? "active" : ''}>
            <a  onClick={()=>navigate('/')}>About</a>
          </li>
          <li  className={props.index == 2 ? "active" : ''}>
            <a  onClick={()=>navigate('/gallery')}>Gallary</a>
          </li>
          <li className={props.index == 3 ? "active" : ''}>
            <a onClick={()=>{navigate('/faq')}}>FAQ</a>
          </li>
          <li>
            <a onClick={()=>(setContactTrigger(true))}>Contact</a>
          </li>
        </ul>
      </div>
      <div className="action-btns">
        <Button variant="outlined" className="login-btn" onClick={()=>navigate("/login")}>Login</Button>
        <Button variant="contained" className="signup-btn" onClick={()=>navigate("/signup")}>SignUp</Button>
      </div>
    </div>
  );
};

export default Navbar;
