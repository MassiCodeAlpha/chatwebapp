import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { SocketContext } from "./SocketContext";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
});
const Options = ({ children }) => {
  const { me, callUser, callAccepted, callEnded, name, setName, leaveCall } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const classes = useStyles();
  useContext(SocketContext);
  return (
    <Container>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography variant="h6" gutterBottom>
                Account Info
              </Typography>
              <TextField
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              {console.log(me)}
              <CopyToClipboard text={me} className={classes.margin}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography variant="h6" gutterBottom>
                Make a Call
              </Typography>
              <TextField
                label="Id To Call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PhoneDisabled size="large" />}
                  color="secondary"
                  onClick={leaveCall}
                  className={classes.margin}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Phone size="large" />}
                  color="secondary"
                  onClick={() => {
                    callUser(idToCall);
                  }}
                  className={classes.margin}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Options;
