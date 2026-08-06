import { Router, Route } from "preact-router";
import "./App.css";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Route path="/" component={Welcome} />
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default App;
