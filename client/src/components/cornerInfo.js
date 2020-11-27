import React from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';

import "./cornerInfo.css";

export default function CornerInfo(props) {

  const {cornerId} = useParams();
  let type;

  if (cornerId === 'Corner1' || cornerId === 'Corner4') {
    type = (<div className="individual-card" >
        <div className="individual-card-header">
          <h1>GO!</h1>
          <Link to="/" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className="individual-card-body">
        <h3>Everytime you pass one of the GO spaces you get one point! Just for showing up! Happy reading!</h3>
        <h3 className="outcome">+1 Point</h3>
        </div>
      </div>)
  } else if (cornerId === 'Corner2') {
    type = (<div className="individual-card" >
        <div className="individual-card-header">
        <h1>Welcome to the Reading Railroad!</h1>
        <Link to="/" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className="individual-card-body">
        <h3>Would you like to take a one way trip to Central Station? (It's free!)</h3>
        <Button variant="contained" color="primary" className="btn">Let's Go!</Button>
        <Button variant="contained" color="secondary">I'll Pass</Button>
        </div>
      </div>)
  } else if (cornerId === 'Corner3') {
    type = (<div className="individual-card" >
        <div className="individual-card-header">
          <h1>Welcome to Central Station!</h1>
          <Link to="/" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className="individual-card-body">
        <h3>Would you like to take a one way trip to the Reading Railroad? (It's free!)</h3>
        <Button variant="contained" color="primary" className="btn">Let's Go!</Button>
        <Button variant="contained" color="secondary">I'll Pass</Button>
        </div>
      </div>)
  } else {
    type = (<div className="individual-card" >
        <div className="individual-card-header">
        <h1> </h1>
        <Link to="/" ><CancelIcon></CancelIcon> </Link>
        </div>
        <div className="individual-card-body">
        <h3>Woops! It looks like that space doesn't exist!</h3>
        </div>
      </div>)
  }

  return (
    <div>
      {type}
    </div>
  )
}