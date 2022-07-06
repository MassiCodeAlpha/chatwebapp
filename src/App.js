import React from "react";
import VideoPlayer from "./Components/VideoPlayer";
import Notifications from "./Components/Notifications";
import Options from "./Components/Options";
import { Typography, AppBar } from "@mui/material/";
import "./App.css";
const App = () => {
  return (
    <div className="wrapper">
      <AppBar className="appBar" position="static" color="inherit">
        <Typography variant="h2" align="center">
          Video chat
        </Typography>
        {/* VideoPlayer */}
        {/* Options => Notifications */}
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};
export default App;
