import React from "react";
import Iframe from "react-iframe";

const Documentation = () => {
  return (
    <Iframe
      url="/docs"
      width="100%"
      height="500px"
      id="docframe"
      display="block"
      position="relative"
    />
  );
};

export default Documentation;
