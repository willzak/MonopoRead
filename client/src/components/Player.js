import React from "react"



export default function Player( props ) {
  return (
    <div>
      <h1> Player Form  </h1>
      <label for="player-color">Choose a Color: </label>
      <select name="colors">
        <option value="Red">Red</option>
        <option value="Pint">Pink</option>
        <option value="Blue">Blue</option>
        <option value="Yellow">Yellow</option>
      </select>
    </div>
  )
}