// import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Button from "../components/Button";
import { useEffect } from "react";

const VideoRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true, audio: true });

  useEffect(() => {
    localStorage.setItem("video", mediaBlobUrl);
  }, [mediaBlobUrl]);
  return (
    <div className="bg-gray-900 w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-10">
      <div className="mx-auto ">
        <video
          src={mediaBlobUrl}
          controls
          autoPlay
          loop
          className="max-w-[1200px] w-[1200px]"
        />
      </div>
      <div className=" text-white w-[30%]  flex flex-row gap-10 justify-center items-center ">
        <Button onclick={startRecording} text={"Start Recording"}></Button>
        <Button onclick={stopRecording} text={"Stop Recording"}></Button>
      </div>
    </div>
  );
};

export default VideoRecorder;
