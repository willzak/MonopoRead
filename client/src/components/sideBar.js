import React from "react";

export default function SideBar(props) {
  return (
    <div class="side-bar">
      <div class="player-status">
        <div>
          <strong>Player 1</strong>
        </div>
        <br></br>
        <div class="stats">
          • Books Read: 2
        </div>
        <div class="stats">
          • Last Move: 2 days ago
        </div>
      </div>
      <div class="player-status">
        <div>
          <strong>Player 2</strong>
        </div>
        <br></br>
        <div class="stats">
          • Books Read: 1
        </div>
        <div class="stats">
          • Last Move: 7 days ago
        </div>
      </div>
      <div class="player-status">
        <div>
          <strong>Player 3</strong>
        </div>
        <br></br>
        <div class="stats">
          • Books Read: 3
        </div>
        <div class="stats">
          • Last Move: 7 hours ago
        </div>
      </div>
    </div>
  )
}