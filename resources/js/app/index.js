import React from "react";
import ReactDOM from "react-dom";

import "milligram";

import Tasks from "./pages/tasks";

function App() {
  return <Tasks />;
}

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
