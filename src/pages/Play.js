import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";

const endPoint = process.env.SOCKET_ENDPOINT;

export default () => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState("");
  const { roomId } = useParams();

  useEffect(() => {
    setSocket(socketIOClient(endPoint));
    socket.on(roomId, (d) => {
      setData(data + d);
    });
  }, [endPoint]);

  return (
    <div>
      <h1>Play</h1>
      <p>{data}</p>
    </div>
  );
};
