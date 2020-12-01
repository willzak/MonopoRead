import React from "react"
import "./Home.css"

export default function Login(props) {

  return (
    <div className="home-page">
      <h3>Log in as:</h3>
      <div className="users">
        {props.users.map((user, index) => {
          return <h3 style={{textAlign: 'center', padding: '10px', width: '100px', border: (props.user.id === user.id) ? '1px solid black' : 'none'}} onClick={() => props.login(user.email, 'password')} key={index}>{user.name}</h3>
        })}
      </div>
    </div>
  )
}