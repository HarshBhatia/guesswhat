import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./pages/Main";
import Play from "./pages/PlayScreen";

function App() {
  return (
    <div>
      <h1>Guess What?</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/:gameId" exact component={Play} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
