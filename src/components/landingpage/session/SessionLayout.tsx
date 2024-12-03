import React from "react";
import { Typography } from "@mui/material";

interface SessionLayoutProps {
  heading?: string;
  spanHeader?: string;
  children: React.ReactNode;
}

const SessionLayout = (props: SessionLayoutProps) => {
  const { heading, spanHeader, children } = props;
  return (
    <>
      <Typography variant="h5" className="sectionHeader">
        {heading} <span className="subcardheading">{spanHeader}</span>
      </Typography>
      <div className="flex">{children}</div>
    </>
  );
};

export default SessionLayout;
