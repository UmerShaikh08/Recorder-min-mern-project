import { Route, Routes } from "react-router-dom";
import "./App.css";
import Atuhentication from "./pages/Authentication";
import Home from "./pages/Home";
import Recorder from "./pages/Recorder";
import ScreenRecorder from "./pages/ScreenRecorder";
import VideoRecorder from "./pages/VideoRecorder";
import OpenRoute from "./components/OpenRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element=<Home /> />
        <Route
          path="/authentication"
          element=<OpenRoute>
            {" "}
            <Atuhentication />{" "}
          </OpenRoute>
        />

        {/* I not full functionality of token  , I am not use redux store */}
        <Route
          path="/recorder"
          element=<PrivateRoute>
            <Recorder />{" "}
          </PrivateRoute>
        />
        <Route
          path="/screen-recorder"
          element=<PrivateRoute>
            {" "}
            <ScreenRecorder />{" "}
          </PrivateRoute>
        />
        <Route
          path="/video-recorder"
          element=<PrivateRoute>
            <VideoRecorder />
          </PrivateRoute>
        />
      </Routes>
    </div>
  );
}

export default App;
