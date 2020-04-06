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

  const takeGuess = (guess) => {
    socket.emit("takeGuess", gameId, guess);
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
      {gameState && (
        <div>
          <h4>
            Time Remaining:{gameState.timeRemaining} of {gameState.roundTime}
          </h4>
          <h3>Players</h3>
          <ul>
            {Object.values(gameState.players).map((p) => (
              <li key={p.name}>
                <b>Name: </b>
                {p.name} <b>Score: </b>
                {p.points}
              </li>
            ))}
          </ul>
          <h3>Chat</h3>
          <GuessChat guesses={gameState.guesses} onGuess={takeGuess} />
          <button onClick={() => startNextRound()}>Start Round</button>
        </div>
      )}
      {!gameState && <p>Waiting for other people to join...</p>}
      {/* <code><pre>{JSON.stringify(gameState)}</pre></code> */}
    </div>
  );
};

const GuessChat = ({ onGuess, guesses }) => {
  const [guess, setGuess] = useState("");

  return (
    <div>
      <ul>
        {guesses.map((g) => (
          <li>
            {g.user.name}:{g.value}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onGuess(guess);
          setGuess("");
        }}
      >
        <input value={guess} onChange={(e) => setGuess(e.target.value)} />
        <button type="submit" children="Guess" />
      </form>
    </div>
  );
};
