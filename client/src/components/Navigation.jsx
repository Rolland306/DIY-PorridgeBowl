import React from "react";
import "../App.css";
import "../css/Navigation.css";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <h1>Porridge Bowls 🏎️</h1>
        </li>
      </ul>

      <ul>
        <li>
          <a href="/create" role="button">
            Customize
          </a>
        </li>
        <li>
          <a href="/" role="button">
            View Bowls
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
