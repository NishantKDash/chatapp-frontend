import React, { useEffect, useState } from "react";
import GetUser from "../apis/GetUser";
import Users from "./Users";
import { useNavigate } from "react-router-dom";
import CreateChat from "../apis/CreateChat";
function CreateGroup() {
  let [usernames, SetUsernames] = useState([]);
  let [chatuser, SetChatUser] = useState([localStorage.getItem("username")]);
  let [chatname, setChatName] = useState("");
  let navigate = useNavigate();

  function handleClick() {
    if (chatname === "") alert("Chat name cant be null");
    else
    if(chatuser.length === 1) alert("You have to create chat with at least one member other than you!");
    else {
      let chat = {
        usernames: chatuser,
        admin: localStorage.getItem("username"),
        name: chatname,
      };
      CreateChat(chat)
        .then((res) => {
          navigate("/home");
          navigate(0);
        })
        .catch((e) => console.log(e));
    }
  }

  function handleChange(e) {
    setChatName(e.target.value);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    let response = await GetUser();
    SetUsernames(response.data);
  }

  return (
    <div className="container">
      <input
        type="text"
        className="form-control w-25 p-2 container my-3"
        id="chatname"
        placeholder="ChatName"
        onChange={handleChange}
      />
      <h1>Users</h1>
      {usernames.map(function (username) {
        if (username !== localStorage.getItem("username"))
          return (
            <div className="container my-3">
              <Users
                name={username}
                SetChatUser={SetChatUser}
                chatuser={chatuser}
              ></Users>
            </div>
          );
      })}
      <button className="btn btn-success my-2" onClick={handleClick}>
        Create chat
      </button>
      <button className="btn btn-warning my-2 mx-2" onClick={(()=>{navigate('/home')})}>
        Go Back
      </button>
    </div>
  );
}

export default CreateGroup;
