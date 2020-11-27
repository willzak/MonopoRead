import React from "react";
import { Link } from "react-router-dom";
import CancelIcon from '@material-ui/icons/Cancel';

import "./hiddenChance.css";

export default function HiddenChance(props) {
  return (
    <div className="hidden-card" >
      <div className="hidden-card-header">
        <h1>?</h1>
      </div>
      <div className="hidden-card-body">
        <h3>Chance <Link to="/board" ><CancelIcon></CancelIcon> </Link></h3>
      </div>
    </div>
  )
}