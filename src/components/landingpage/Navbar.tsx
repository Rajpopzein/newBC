import { Button } from "@mui/material";
import logo from "../../assets/Bulls-catch-logo-transparent.png"
import { useNavigate } from "react-router";


const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className="landingpage-navmain">
      <div style={{width:'66px', height:'33px'}}>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="navlist">
        <ul>
          <li className="active">
            <a onClick={()=>navigate('/')}>About</a>
          </li>
          <li>
            <a href="#">Product</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
        </ul>
      </div>
      <div className="action-btns">
        <Button variant="outlined" className="login-btn" onClick={()=>navigate("/login")}>Login</Button>
        <Button variant="contained" className="signup-btn">SignUp</Button>
      </div>
    </div>
  );
};

export default Navbar;
