import React from "react";
import { Typography } from "@mui/material";

type Props = {
  heading: string;
  spanHeader: string;
  children: React.ReactNode;
}

const SessionLayout = (props: Props) => {
  return (
    <>
      <Typography variant="h5" className="sectionHeader">
        {props.heading} <span className="subcardheading">{props.spanHeader}</span>
      </Typography>
      {props.children}
    </>
  );
};

export default SessionLayout;
