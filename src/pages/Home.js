import React from "react";

function Home() {
  return (
    <div>
      <label style={{ marginLeft: "20px" }}>Game ID</label>
      <input
        style={{ marginLeft: "30px" }}
        type="text"
        placeholder="enter your Game ID"
      />
      <div style={{ marginTop: "20px" }}>
        <button style={{ marginLeft: "20px" }}>Join Game</button>
        <button style={{ marginLeft: "30px" }}>Create Game</button>
      </div>
    </div>
  );
}

export default Home;
