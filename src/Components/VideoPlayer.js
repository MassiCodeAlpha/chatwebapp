import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Paper } from "@mui/material";
import { SocketContext } from "./SocketContext";
const useStyles = makeStyles({
  video: {
    width: "550px",
  },
  gridContainer: {
    justifyContent: "center",
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
});
const VideoPlayer = () => {
  const classes = useStyles();
  const { myVideo, userVideo, name, callAccepted, call, stream, callEnded } =
    useContext(SocketContext);
  return (
    <Grid container className={classes.gridContainer}>
      {/* Our Video  */}
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <video
              className={classes.video}
              playsInline
              muted
              ref={myVideo}
              autoPlay
            />
          </Grid>
        </Paper>
      )}
      {/* User Video  */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name}
            </Typography>
            <video
              className={classes.video}
              playsInline
              ref={userVideo}
              autoPlay
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
