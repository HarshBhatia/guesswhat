import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Pages/Home";
import Play from "./Pages/Play";

function App() {
  return (
    <div className="App">
      <h1>Guess What?</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:uid" exact component={Play} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
