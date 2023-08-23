import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import apiConnector from "../utils/apiConnector";

const Recorder = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  const getData = async (data) => {
    try {
      setLoading(true);

      const response = await apiConnector(
        "POST",
        process.env.REACT_APP_NODE_USER_URL,
        { token }
      );

      if (response?.data?.success) {
        setName(response?.data?.user?.name);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/authentication");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className=" bg-gray-900 h-[100vh] flex flex-col items-center justify-center gap-10">
      <div>
        <h1 className=" text-3xl font-semibold font-mono text-pink-500 ">
          Hi {name ? name : "User"} Start Your Recording
        </h1>
      </div>
      <div className="flex flex-row items-center justify-center gap-10">
        <Link to={"/screen-recorder"}>
          <div className=" ">
            <button className="  bg-yellow-400 text-black py-2 px-2 font-semibold rounded-md transition-all duration-150 hover:scale-95 ">
              Go to Screen Recorder
            </button>
          </div>
        </Link>

        <Link to={"/video-recorder"}>
          <div>
            <button className=" bg-yellow-400 text-black py-2 px-2 font-semibold rounded-md transition-all duration-150 hover:scale-95  ">
              Go to Video Recorder
            </button>
          </div>
        </Link>
      </div>
      <div>
        <button
          onClick={logout}
          className=" bg-yellow-400 text-black py-2 px-2 font-semibold rounded-md transition-all duration-150 hover:scale-95  "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Recorder;
