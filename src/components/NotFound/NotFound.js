import React from "react";
import Nav from "../Nav/Nav";
import "./NotFound.css";
import Dennis from "../NotFound/Dennis.gif";

function NotFound() {
      return (
        <div className="Not-Found">
          <Nav />
          <main>
            <img src={Dennis} alt="notFound"/>
            <header className="not-found-header">
              <h2>Ah ah ah, you didn't say the magic word!</h2>
            </header>
          </main>
        </div>
      );
    }
    

export default NotFound;