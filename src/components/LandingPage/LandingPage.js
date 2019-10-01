import React from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";
import Context from "../../context/Context";
import SignUpForm from "../SignUpForm/SignUpForm";
import Nav from "../Nav/Nav";
//import "./LandingPage.css";

class LandingPage extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div className="Landing-Page">
        <Nav />
        <main role="main" className="main" id="home">
          <section className="about-section">
            <header role="banner" id="about">
              <h2>Track employee trainings</h2>
            </header>
            <p className="intro-paragraph">
              Keep up-to-date on what trainings each of your employees has completed.
            </p>
            <NavLink smooth to="/#sign-up" className="sign-up-button">
              Sign Up
            </NavLink>
          </section>
          <section className="info-section">
            <header role="banner">
              <h3>
                Training Tracker helps managers keep track of whose been trained on what.
              </h3>
            </header>
            <div className="card-container">
              <div className="card">
                <header role="banner">
                  <h3>Keep Track of What Employees Know</h3>
                </header>
                <p>
                  Keep their information updated so you know what trainings are done and what needs to be done next.
                </p>
              </div>
              <div className="card">
                <header role="banner">
                  <h3>Share information with other managers</h3>
                </header>
                <p>
                  Other managers can look at who knows what so they can assign them the correct tasks.
                </p>
              </div>
            </div>
          </section>
          <section className="demo-section">
            <div className="card demo-section-card">
              <h3>Demo Account</h3>
              <p>Test it for yourself:</p>
              <ul>
                <li>Username: TDB</li>
                <li>Password: TDB</li>
              </ul>
              <NavLink to="/login" className="sign-up-button">
                Login Link
              </NavLink>
            </div>
          </section>
          <section className="sign-up-section" id="sign-up">
            <header role="banner">
              <h3>
                Track your employees
              </h3>
            </header>
            <h3>Sign Up</h3>
            <SignUpForm {...this.props} />
          </section>
        </main>
      </div>
    );
  }
}

export default LandingPage;