import React from "react";
import closeIcon from '../../icons/closeIcon.png'
import './InfoBar.css'

const InfoBar = () => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>Chat App</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close chat" /></a>
    </div>
  </div>
)

export default InfoBar