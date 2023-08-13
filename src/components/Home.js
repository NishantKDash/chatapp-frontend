import React, { useEffect, useState } from "react";
import Message from "./Message";
import { Link } from "react-router-dom";
import GetChat from "../apis/GetChat";
import Chats from "./Chats";
import GetMessages from "../apis/GetMessages";
import { activate, deactivate, subscribe } from "../apis/SendChat";
import DeleteChat from "../apis/DeleteChat";

function Home() {
  let [chats, setChats] = useState([]);
  let [visible, setVisible] = useState(false);
  let vchats = [];
  let [currChat,setcurrChat] = useState({})


  useEffect(() => {
    GetChat(localStorage.getItem("username"))
      .then((res) => {
        for (let i = 0; i < res.data.chatids.length; i++) {
          vchats.push({ id: res.data.chatids[i], name: res.data.chatnames[i] });
        }
        setChats(vchats);
        activate();
      })
      .catch((e) => console.log(e));
  }, []);

  function handleLogout() {
    deactivate();
    localStorage.clear();
  }

  useEffect(()=>{
    if(JSON.stringify(currChat) !== "{}")
    {
      setVisible(true)
      subscribe(currChat.id , currChat , setcurrChat , setVisible);
      console.log('subscribed')
    }
  },[currChat])

  function getMessages(chatid, chatname) {
    GetMessages(chatid)
          .then((res) => {
            setcurrChat({
              id: chatid,
              name: chatname,
              messages: res.data,
            });})
            .catch(e=>alert(e))
  }

   function deleteChat(chatid)
  {
      DeleteChat(chatid).then().catch(e=>console.log(e))
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
            {chats.map(function (chat) {
              return (
                <div className="container my-3">
                  <Chats
                    chatname={chat.name}
                    chatid={chat.id}
                    getMessages={getMessages}
                    deleteChat = {deleteChat}
                  ></Chats>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-lg">
          <h3>Messages</h3>
          {visible && <Message currChat={currChat}></Message>}
        </div>
      </div>
    </div>
  );
}

export default Home;
