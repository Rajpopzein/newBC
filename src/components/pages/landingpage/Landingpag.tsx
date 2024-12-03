import React from "react";
import Navbar from "../../landingpage/Navbar.tsx";
import { Button, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
const Landingpag = () => {
  return (
    <div className="main-landingpage">
      <Navbar />
      <section className="banner-section">
        <div className="text-container">
          <p className="header"><span className="highlighter">BullsCatch</span> Trading Floor</p>
          <Typography variant="subtitle2" className="secondary-text">learning And earning without risk to personal capital</Typography>
          <div className="banner-button">
            <Button variant="contained" className="explore-btn">Lets's Explore</Button>
            <Button startIcon={<PersonIcon/>}  className="contactbtn">Contact</Button>
          </div>
        </div>
        <img src="" alt="banner-image"/>
      </section>
    </div>
  );
};

export default Landingpag;
