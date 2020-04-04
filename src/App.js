import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Play from "./pages/Play";

function App() {
  return (
    <div>
      <h1>Guess What?</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:roomId" exact component={Play} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
