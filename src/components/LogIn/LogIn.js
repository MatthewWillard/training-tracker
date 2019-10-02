import React from "react";
import Nav from "../Nav/Nav";
import AuthApiService from "../../services/auth-api-service";
import Context from "../../context/Context";
import "./LogIn.css";

class LogIn extends React.Component {
  static contextType = Context;

  state = {
    error: null
  };

  handleLoginSuccess = username => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/main";
    history.push(destination);
  };

  handleSubmitJwtAuth = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { username, password } = e.target;
    this.context.updateUsername(username.value);

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = "";
        password.value = "";
        this.handleLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="Log-In">
        <Nav />
        <section className="demo-section">
            <div className="card demo-section-card">
              <h3>Demo Account</h3>
              <ul>
                <li>Username: Demo</li>
                <li>Password: Password0!</li>
              </ul>
            </div>
          </section>
        <main>
          <header>
            <h2>Log In</h2>
          </header>
          <form onSubmit={this.handleSubmitJwtAuth}>
            <div role="alert">{error && <p className="error">{error}</p>}</div>
            <div>
              <label htmlFor="login-username">User Name</label>
              <input
                placeholder="User Name"
                type="text"
                name="username"
                id="username"
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                required
              />
            </div>

            <button type="submit">Log In</button>
          </form>
        </main>
      </div>
    );
  }
}

export default LogIn;