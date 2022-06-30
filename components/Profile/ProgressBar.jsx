import React from "react";

const ProgressBar = ({ value }) => {
  return <progress value={value} max={100} className="w-1/2"/>;
};

export default ProgressBar;
