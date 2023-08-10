import React, { useEffect, useState } from "react";
import Message from "./Message";
import { Link } from "react-router-dom";
import GetChat from "../apis/GetChat";
import Chats from "./Chats";
import GetMessages from "../apis/GetMessages";
import { createClient, disconnect } from "../apis/SendChat";

function Home() {
  let [chats, setChats] = useState([]);
  let [currChat, setCurrChat] = useState({});
  let [visible, setVisible] = useState(false);
  let [client, setClient] = useState();
  let vchats = [];

  useEffect(() => {
    GetChat(localStorage.getItem("username"))
      .then((res) => {
        for (let i = 0; i < res.data.chatids.length; i++) {
          vchats.push({ id: res.data.chatids[i], name: res.data.chatnames[i] });
        }
        setChats(vchats);
      })
      .catch((e) => console.log(e));
  }, []);

  function handleLogout() {
    localStorage.clear();
  }

  async function getMessages(chatid, chatname) {
    await GetMessages(chatid)
      .then((res) => {
        setCurrChat({ id: chatid, name: chatname, messages: res.data });
        setVisible(true);
        if (client !== undefined) {
          disconnect(client);
        }
         console.log(currChat)
          setClient(createClient(chatid, currChat, setCurrChat));
      })
      .catch((e) => console.log(e));
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
                  ></Chats>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-lg">
          <h3>Messages</h3>
          {visible && <Message currChat={currChat} client={client}></Message>}
        </div>
      </div>
    </div>
  );
}

export default Home;
