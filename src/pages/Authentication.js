import React, { useState } from "react";
import { useForm } from "react-hook-form";
import apiConnector from "../utils/apiConnector";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Atuhentication = () => {
  const { register, handleSubmit } = useForm();
  const nevigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const sumbitData = async (data) => {
    try {
      setLoading(true);

      const response = await apiConnector(
        "POST",
        process.env.REACT_APP_NODE_AUTH_URL,
        data
      );

      if (!response?.data?.success) {
        setLoading(false);
        throw new Error("failed to signin or signup");
      } else {
        localStorage.setItem("token", response?.data?.user?.token);
        setLoading(false);
        nevigate("/recorder");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <form
      onSubmit={handleSubmit(sumbitData)}
      className="h-[100vh] w-[100vw] bg-gray-900 text-white "
    >
      <div className=" w-[70%] mg:w-[40%] lg:w-[30%] h-full flex flex-col mx-auto justify-center  gap-7">
        <div>
          <h1 className="text-3xl font-semibold">Welcome To Screen Recorder</h1>
        </div>
        <div className="flex flex-col gap-2">
          {/* name */}
          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            required
            {...register("name")}
            className=" w-full text-white bg-gray-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-gray-200 focus:outline-none focus:bg-richblack-700"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          {/* email */}
          <label htmlFor="email" className="w-full ml-0">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            required
            {...register("email")}
            className=" w-full text-white bg-gray-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-gray-200 focus:outline-none focus:bg-richblack-700"
          ></input>
        </div>
        <div>
          {/* button */}
          <button
            type="sumbit"
            className=" w-full bg-yellow-400 text-black py-2  rounded-md "
          >
            Sing In
          </button>
        </div>
      </div>
    </form>
  );
};

export default Atuhentication;
