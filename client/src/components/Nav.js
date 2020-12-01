import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Button from "@material-ui/core/Button"

export default function Nav (props) {
  return (
    <div className='nav-bar'>
      <div className="nav-bar-left">
        <img src="Monoporead_Icon.png" alt="Monoporead Logo of Mr.Monopoly" className="nav-icon" />
        <Link to={`/`}>
        <img src="MonopoRead.png" alt="Monoporead Logo" className="logo" />
        </Link>
      </div>
      <div className="nav-bar-right">
        <div>
          <h2 style={{margin: '10px'}}>{props.user ? `Logged in as ${props.user.name}` : 'Not logged in'}</h2>
        </div>
        <div>
          <Button variant= "outlined" style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick={props.user ? props.logout : props.login}>{props.user ? 'Logout' : 'Login'}</Button>
        </div>
      </div>
    </div>
  )
}
