import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';

import "./cornerInfo.css";

export default function CornerInfo(props) {

  let occupied = {
    corner2: [],
    corner3: []
  }

  for (let user of props.players) {
    if (!user.player.moving && user.player.position === 18) {
      occupied['corner2'].push(user);
    } else if (!user.player.moving && user.player.position === 6) {
      occupied['corner3'].push(user);
    }
  }
  const {cornerId} = useParams();
  let type;

  if (cornerId === 'Corner1' || cornerId === 'Corner4') {
    type = (<div className="individual-card" >
        <div className="individual-card-header">
          <h1>GO!</h1>
          <Link to="/board" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className="individual-card-body">
          <h3>Everytime you pass one of the GO spaces you get one point! Just for showing up! Happy reading!</h3>
          <h3 className="outcome">+1 Point</h3>
        </div>
      </div>)
  } else if (cornerId === 'Corner2' && occupied['corner2'].length !== 0) {
    type = (<div className="individual-card" >
        <div className="individual-card-header">
          <h1>Welcome to the Reading Railroad!</h1>
          <Link to="/board" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className="individual-card-body">
          <h3>Would you like to take a one way trip to Central Station? (It's free!)</h3>
          <div className="btn-container">
            <Button onClick={() => props.transport(props.currentPlayer)} variant="contained" color="primary" className="btn">Let's Go!</Button>
            <Button variant="contained" color="secondary">I'll Pass</Button>
          </div>
        </div>
      </div>)
  } else if (cornerId === 'Corner3' && occupied['corner3'].length !== 0) {
    type = (<div className="individual-card" >
        <div className="individual-card-header">
          <h1>Welcome to Central Station!</h1>
          <Link to="/board" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className="individual-card-body">
          <h3>Would you like to take a one way trip to the Reading Railroad? (It's free!)</h3>
          <div className="btn-container">
            <Button onClick={() => props.transport(props.currentPlayer)} variant="contained" color="primary" className="btn">Let's Go!</Button>
            <Button variant="contained" color="secondary">I'll Pass</Button>
          </div>
        </div>
      </div>)
  }  else if (cornerId === 'Corner3' && occupied['corner3'].length === 0) {
    type = (<div className="individual-card" >
        <div className="individual-card-header">
          <h1>Welcome to Central Station!</h1>
          <Link to="/board" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className="individual-card-body">
          <h3>Landing on this space wins you a one way ticket to the Reading Railroad. Pretty sweet right?</h3>
        </div>
      </div>)
  } else if (cornerId === 'Corner2' && occupied['corner2'].length === 0) {
      type = (<div className="individual-card" >
          <div className="individual-card-header">
            <h1>Welcome to the Reading Railroad!</h1>
            <Link to="/board" ><CancelIcon></CancelIcon> </Link>
          </div>
          <div className="individual-card-body">
            <h3>Landing on this space wins you a one way ticket to the Central Station! You can always decline if it's not your thing.</h3>
          </div>
        </div>
      )
  } else {
    type = (<div className="individual-card" >
        <div className="individual-card-header">
        <h1> </h1>
        <Link to="/board" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className="individual-card-body">
        <h3>Woops! It looks like that space doesn't exist!</h3>
        </div>
      </div>
    )
  }

  return (
    <div>
      {type}
    </div>
  )
}