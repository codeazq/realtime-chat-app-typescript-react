import React from "react";
import './Message.css'

import ReactEmoji from 'react-emoji'

const Message = ({ message: { user, text, time }, name }) => {
  let isSentByCurrentUser = false

  const trimmedName = name.trim().toLowerCase()

  if (user === trimmedName) {
    isSentByCurrentUser = true
  }

  return (
    isSentByCurrentUser ? (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">{trimmedName}</p>
        <div className="messageBox backgroundBlue">
          {/* <p className="messageText colorWhite">
            {ReactEmoji.emojify(text)}
          </p> */}
          <div className="colorWhite">{ReactEmoji.emojify(text)}</div>
          <div className="messageTime colorLightBlue">{time}</div>
        </div>
      </div>
    ) : (
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          {/* <p className="messageText colorDark">
            {ReactEmoji.emojify(text)}
          </p> */}
          <div className="colorDark">{ReactEmoji.emojify(text)}</div>
          <div className="messageTime colorLightGrey">{time}</div>
        </div>
        <p className="sentText pl-10">{user}</p>
      </div>
    )
  )
}

export default Message