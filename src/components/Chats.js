import "./chats.css";
import React from "react";
import { useState } from "react";

function Chats(props) {
  async function handleClick() {
    props.getMessages(props.chatid, props.chatname);
  }

  let [deleted , setDeleted] = useState(false)

  function handleDelete()
  {
    setDeleted(true)
    props.deleteChat(props.chatid)
  }
  return (
    <div>
      { !deleted && 
      <div className="card">
        <ul className="list-group list-group-flush">

            <li className="list-group-item chatlist" key = {props.chatid}>
              <div className="container">
                <button className="chat" onClick={handleClick}>
                  {props.chatname === '' ? "<No Name>":props.chatname}
                </button>
                <button className="btn btn-danger chatbtn " onClick={handleDelete}>Delete</button>
              </div>
            </li>
        </ul>
      </div>
     }
    </div>
  );
}

export default Chats;
