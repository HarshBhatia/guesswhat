import { useEffect, useState } from "react";
import io from "socket.io-client";

const endPoint = process.env.SOCKET_ENDPOINT;

export default ({
  onGameJoined,
  onGameCreated,
  onGamePlayersUpdate,
  onError,
}) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4001");
    socket.on("message", (x) => {
      console.log(x);
    });

    socket.on("gameJoined", onGameJoined);
    socket.on("gameCreated", onGameCreated);
    socket.on("gameError", onError);
    socket.on("gamePlayersUpdate", onGamePlayersUpdate);
    setSocket(socket);
  }, []);

  const createGame = async (payload) => {
    if (!socket) throw new Error({ message: "No socket" });
    socket.emit("createGame", payload);
    return true;
  };

  const joinGame = (payload) => {
    if (!socket) throw new Error({ message: "No socket" });
    socket.emit("joinGame", payload);
    return true;
  };
  return { createGame, joinGame, socket };
};
