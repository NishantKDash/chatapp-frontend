import React from "react";
import SingleMessage from "./SingleMessage";
import { publish , publishNotification , subscribeSignalling} from "../apis/SendChat";
import "./chats.css";
import GetUsersForChat from "../apis/GetUsersForChat";
import { useNavigate } from "react-router-dom";
function Message(props) {
  let body = { username: localStorage.getItem("username"), message: "" };
  let navigate = useNavigate()
  function handleClick() {
    publish(props.currChat.id, body);
  }

  function handleChange(e) {
    body = {
      username: localStorage.getItem("username"),
      message: e.target.value,
    };
  }

  function videoCall()
  {
     GetUsersForChat(props.currChat.id).then(res=>{
      if(res.data.usernames.length > 2)
      alert("Video call is only available for 2 users currently")
    else
      {
      publishNotification(res.data.usernames , props.currChat.id , {gid:props.currChat.id , gname:props.currChat.name , media:'video'});
      navigate(`/room/${props.currChat.id}`)}
     }).catch(e => console.log(e));
     
  }

  function audioCall()
  {
    GetUsersForChat(props.currChat.id).then(res=>{
      if(res.data.usernames.length > 2)
      alert("Audio call is only available for 2 users currently")
      else{
      publishNotification(res.data.usernames , props.currChat.id , {gid:props.currChat.id , gname:props.currChat.name , media:'audio'});
      navigate(`/room/${props.currChat.id}`)}
     }).catch(e => console.log(e));
  }
  return (
    <div>
      <div className="container chattitle">
        <h2>{props.currChat.name}</h2>
        <button className="btn btn-info" onClick={audioCall}>Audio Call</button>
        <button className="btn btn-success mx-2" onClick={videoCall}>Video Call</button>
      </div>

      {props.currChat.messages.map(function (message ,idx) {
        return (
          <div className="container my-3">
            <SingleMessage  message={message}></SingleMessage>
          </div>
        );
      })}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type Message"
          onChange={handleChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-success"
            type="button"
            onClick={handleClick}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
