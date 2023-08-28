import React from "react";

function SingleMessage(props) {
  return (
    <div>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item" >{localStorage.getItem('username') === props.message.username ? 'You' : props.message.username}- {props.message.message}</li>
        </ul>
      </div>
    </div>
  );
}

export default SingleMessage;
