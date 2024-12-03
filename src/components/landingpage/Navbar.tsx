import { Button } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <div className="landingpage-navmain">
      <img className="" src="" alt="logo" />
      <div className="navlist">
        <ul>
          <li className="active">
            <a href="#">About</a>
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
        <Button variant="outlined" className="login-btn">Login</Button>
        <Button variant="contained" className="signup-btn">SignUp</Button>
      </div>
    </div>
  );
};

export default Navbar;
