import "./App.scss";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import ShortenUrl from "./pages/ShortenUrl";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";

function App() {
  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("access_token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin/login" component={Login} />
        <ProtectedRoute exact path="/admin" component={Dashboard} />
        <Route exact path="/:code" component={ShortenUrl} />
      </Switch>
    </Router>
  );
}

export default App;
