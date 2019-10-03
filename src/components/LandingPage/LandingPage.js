import React from "react";
import Context from "../../context/Context";
import Nav from "../Nav/Nav";
import "./LandingPage.css";

class LandingPage extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div className="Landing-Page">
        <Nav />
        <main role="main" className="main" id="home">
          <section className="info-section">
            <header role="banner">
              <h3>
                The Training Tracker helps managers keep track of whose been trained on what and what they need to be trained on next.
              </h3>
            </header>
            <div className="card-container">
              <div className="card">
                <header role="banner">
                  <h3>Keep Track of What Employees Know</h3>
                </header>
                <p>
                  Instead of losing track of where new employees are in their training process you can use Training Tracker to keep up to date. 
                </p>
              </div>
              <div className="card">
                <header role="banner">
                  <h3>Keep up to date</h3>
                </header>
                <p>
                  Training tracker allows you to easily add, delete, and update new employees
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default LandingPage;