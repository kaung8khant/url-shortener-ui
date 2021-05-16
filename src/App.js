import "./App.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import ShortenUrl from "./pages/ShortenUrl";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Home} />
        <Route exact path="/:code" component={ShortenUrl} />
      </Switch>
    </Router>
  );
}

export default App;
