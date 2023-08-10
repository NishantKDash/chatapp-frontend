import './chats.css'
import React from "react";

function Chats(props) {
  function handleClick()
  {
     props.getMessages(props.chatid , props.chatname)
  }
  return (
    <div>
      <div className="card">
        <ul className="list-group list-group-flush">
          <div className="container">
          <li className="list-group-item" onClick={handleClick}>{props.chatid}    {props.chatname}</li>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Chats;
