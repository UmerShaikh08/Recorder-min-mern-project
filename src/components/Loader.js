import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] bg-black">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
