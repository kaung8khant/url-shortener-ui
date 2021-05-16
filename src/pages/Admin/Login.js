import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "../../assets/css/login.scss";
import { login } from "../../api/auth";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleFormSubmit = async () => {
    try {
      let response = await login(username, password);
      localStorage.setItem("access_token", response.token);
      setRedirect(true);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  if (redirect) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="login">
      <div className="login__form-input">
        <h3>Admin Login</h3>
      </div>
      {error && (
        <div className="login__error">
          <span className="login__error-text">{error}</span>
        </div>
      )}
      <form className="login__form">
        <div className="login__form-input">
          <TextField
            className="login__form-input-item"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login__form-input">
          <TextField
            className="login__form-input-item"
            id="outlined-basic1"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login__form-input">
          <Button
            variant="contained"
            color="primary"
            className="login__form-input-item"
            onClick={handleFormSubmit}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Login;
