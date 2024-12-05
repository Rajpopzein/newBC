import React from "react";
import bulls from "../../assets/sideimage.png";
import { Card } from "@mui/material";

const AuthLayOut = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <section className="login-main">
        {/* <div className="login-img"> */}
        <img src={bulls} alt="login" className="login-img" />
        {/* </div> */}
        <Card className="login-card">
          {children}
        </Card>
      </section>
    </div>
  );
};

export default AuthLayOut;
