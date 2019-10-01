import React from "react";
import Nav from "../Nav/Nav";
//import "./NotFound.css";

function NotFound() {
      return (
        <div className="Not-Found">
          <Nav />
          <main>
            <header className="not-found-header">
              <h2>Oops! Something went wrong! Page not found.</h2>
            </header>
          </main>
        </div>
      );
    }
    

export default NotFound;