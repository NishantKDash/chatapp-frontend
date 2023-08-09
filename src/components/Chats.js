import React from "react";

function Chats(props) {
  return (
    <div>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{props.chatid}    {props.chatname}</li>
        </ul>
      </div>
    </div>
  );
}

export default Chats;
