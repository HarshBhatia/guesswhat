import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import io from "socket.io-client";

export default () => {
  const [name, setName] = useState("");
  const [gameState, setGameState] = useState(null);
  const [hasJoinedGame, setHasJoinedGame] = useState(null);
  const [socket, setSocket] = useState(null);

  const { gameId } = useParams();
  const {
    location: { state },
  } = useHistory();
  //listen from game state updates
  useEffect(() => {
    const socket = io("http://localhost:4001");
    socket.on(gameId, setGameState);
    setSocket(socket);
  }, []);

  useEffect(() => {
    setHasJoinedGame((state && state.fromHost) || false);
  }, []);

  const joinGame = (name) => {
    socket.emit("joinGame", gameId, name);
    setHasJoinedGame(true);
  };

  const startNextRound = () => {
    socket.emit("startNextRound", gameId);
  };

  if (!hasJoinedGame) {
    return (
      <div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Name"
        />
        <button onClick={() => joinGame(name)}>Join Game</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Time Remaining</h3>
      {gameState && (
        <div>
          <h4>
            {gameState.timeRemaining} of {gameState.roundTime}
          </h4>
          <ul>
            {Object.values(gameState.players).map((p) => (
              <li key={p.name}>
                Name:{p.name} Score:{p.points}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>
        {JSON.stringify(gameState)}
        <button onClick={() => startNextRound()}>Start Round</button>
      </p>
    </div>
  );
};
