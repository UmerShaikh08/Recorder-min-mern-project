import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-black h-[100vh] flex items-center">
      <div className=" flex flex-col gap-3  shadow-lg shadow-gray-600 w-[30%] mx-auto ">
        <h1 className="text-white text-3xl text-center">Screen Recording </h1>
        <div className="mx-auto">
          <Link to={"/authentication"}>
            <button className="bg-yellow-300 py-2 px-5 r rounded-md transition-all duration-200 hover:scale-95">
              Click
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
