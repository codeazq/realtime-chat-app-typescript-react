import React from "react";
import './InfoPanel.css'
import onlineIcon from '../../icons/onlineIcon.png'

const InfoPanel = ({ roomUsers, room }) => {
  return (
    <div className="info-panel">
      <div className="topBar">
      </div>
      <div className="details">
        <h3><i class="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name">{room}</h2>

        <h3><i className="fas fa-users"></i> LoggedIn Users</h3>
        <ul id="users">
          {roomUsers.map(user => <li><img src={onlineIcon} alt="online" className="onlineIcon" />{user.name}</li>)}
        </ul>
      </div>
      {/* 
      <img src={onlineIcon} alt="online" className="onlineIcon" />
      <h3>{room}</h3>
      <div className="heading"></div>
      <h1>This is the info panel</h1>
      <h3><i className="fas fa-users"></i> LoggedIn Users</h3>
      <ul id="users">
        {roomUsers.map(user => <li>{user.name}</li>)}
        
      </ul> */}
    </div >

  )
}

export default InfoPanel