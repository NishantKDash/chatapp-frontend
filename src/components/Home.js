import React, { useEffect, useState } from "react";
import Message from "./Message";
import { Link } from "react-router-dom";
import GetChat from "../apis/GetChat";
import Chats from "./Chats";

function Home() {
  let [chats,setChats] = useState([]);
  let vchats = []

  useEffect(() => {
    GetChat(localStorage.getItem("username"))
      .then((res) => {
        for (let i = 0; i < res.data.chatids.length; i++) {
          vchats.push({ id: res.data.chatids[i], name: res.data.chatnames[i] });
        }
         setChats(vchats)
      } )
      .catch((e) => console.log(e));
  }, []);

  function handleLogout() {
    localStorage.clear();
  }
  return (
    <div className="container">
      <h1>Hello {localStorage.getItem("username")}</h1>
      <Link to="/logout" onClick={handleLogout}>
        Logout
      </Link>
      <div className="row">
        <div className="col-sm">
          <div>
            <nav className="navbar navbar-light bg-light">
              <Link to={"/createGroup"}>Create a new Group</Link>
            </nav>
            <h3>Your Chats</h3>
            {chats.map(function(chat) {
      return (
        <div className='container my-3'>
          <Chats chatname= {chat.name} chatid = {chat.id}></Chats>
        </div>
      )
    })}
          </div>
        </div>
        <div className="col-lg">
          <h3>Messages of Chat1</h3>
          <Message></Message>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Message"
            />
            <div className="input-group-append">
              <button className="btn btn-success" type="button">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
