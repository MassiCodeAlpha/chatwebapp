import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

// const socket = io("http://localhost:5000");
const socket = io("https://calm-inlet-21616-bb30236577ab.herokuapp.com");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));
socket.on("me", (id) => console.log(id));
    socket.on("callUser", ({ From, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, From, name: callerName, signal });
    });
  }, []);
  ///////// Probleemmmmmmm
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: true, stream });
    peer.on("signal", (data) => {
      console.log(call.From);
      socket.emit("answerCall", { signal: data, to: call.From });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };
  /////Fin Probellllllllllm
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        SignalData: data,
        From: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("CallAccepted", (signal) => {
      setCallAccepted(true);
      console.log("LAst Sjkhjhjhjhjhjhignal", signal);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
