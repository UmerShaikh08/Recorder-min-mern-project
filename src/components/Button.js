import React from "react";

const Button = ({ text, onclick }) => {
  return (
    <div className="">
      <button
        onClick={onclick}
        className=" w-[10rem] bg-yellow-400 text-black py-2  rounded-md font-semibold"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
