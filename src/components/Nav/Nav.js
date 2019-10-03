import React from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";
import IdleService from "../../services/idle-service";
import Context from "../../context/Context";
import TokenService from "../../services/token-service";
import "./Nav.css";

class Nav extends React.Component {
  static contextType = Context;

  handleLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.context.updatedLoggedIn();
    this.context.setemployees([]);
  };

  renderLogoutLink() {
    return (
      <div className="loggedin link-container">
        <NavLink to="/add">Add New Employee</NavLink>
        <NavLink to="/main" onClick={this.context.handleMenuClick}>
          Employee List
        </NavLink>
        <NavLink to="/" onClick={this.handleLogout}>
          Log Out
        </NavLink>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="loggedout link-container">
        <NavLink smooth to="/">
          Home
        </NavLink>
        <NavLink smooth to="/signup">
          Sign Up
        </NavLink>
        <NavLink to="/login">Log In</NavLink>
      </div>
    );
  }

  render() {
    return (
      <nav className="Nav">
        <div className="title-container">
        <NavLink smooth to="/">
          Training Tracker
        </NavLink>
        </div>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    );
  }
}

export default Nav;