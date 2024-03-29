import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Nav.css";
import Button from "@material-ui/core/Button"

export default function Nav (props) {
  const history =  useHistory ()
  return (
    <div className='nav-bar'>
      <div className="nav-bar-left">
        <img src="Monoporead_Icon.png" alt="Monoporead Logo of Mr.Monopoly" className="nav-icon" />
        <Link to={`/`}>
        <img src="monoporead-noshadow.png" alt="Monoporead Logo" className="logo" />
        </Link>
          <h2 style={{paddingLeft: '30px'}}>{props.game ? `You are playing: ${props.game.name}` : ''}</h2>
      </div>
      <div className="nav-bar-right">
        <div>
          <h2 style={{margin: '10px'}}>{props.user ? `Logged in as ${props.user.name}` : 'Not logged in'}</h2>
        </div>
        <div>
          {props.user ? (<Button variant= "outlined" style={{ fontSize: '1em', fontWeight: 'bolder' }} onClick={() => props.logout(history)}>Logout</Button>) : (
            <Link to={`/login`}>
              <Button variant= "outlined" style={{ fontSize: '1em', fontWeight: 'bolder' }}>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
