import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav () {
  return (
    <div className="nav-bar">
      <img src="Monoporead_Icon.png" alt="Monoporead Logo of Mr.Monopoly" className="icon" />
      <Link to={`/`}>
        <h1> MONOPOREAD </h1>
      </Link>
    </div>
  )
}
