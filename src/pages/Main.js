import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";

function Main() {
  const [name, setName] = useState("");
  const [socket, setSocket] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4001");
    socket.on("gameCreated", (gameId) => {
      setRedirect(
        <Redirect
          to={{
            pathname: `/${gameId}`,
            state: { fromHost: true },
          }}
        />
      );
    });
    setSocket(socket);
  }, []);

  const createGame = (name, options) => {
    if (!socket) return alert("Wait for socket init");
    socket.emit("createGame", name, options);
  };

  if (redirect) {
    return redirect;
  }

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your Name"
      />
      <button
        onClick={() => {
          createGame(name, { roundTime: 10, numberOfRounds: 2 });
        }}
      >
        Create Game
      </button>
    </div>
  );
}

export default Main;
