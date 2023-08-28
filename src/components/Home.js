import React, { useEffect, useState } from "react";
import Message from "./Message";
import { Link, useNavigate } from "react-router-dom";
import GetChat from "../apis/GetChat";
import Chats from "./Chats";
import GetMessages from "../apis/GetMessages";
import { subscribe ,subscribeNotification, subscribeSignalling} from "../apis/SendChat";
import DeleteChat from "../apis/DeleteChat";

function Home() {
  let [chats, setChats] = useState([]);
  let [visible, setVisible] = useState(false);
  let vchats = [];
  let [currChat,setcurrChat] = useState({})
  let [load , setLoad] = useState(false)
  let [incomingCall , setIncomingCall] = useState({group:{}, media:'' , current:false})
  let navigate = useNavigate()


  useEffect(() => {
    GetChat(localStorage.getItem("username"))
      .then((res) => {
        for (let i = 0; i < res.data.chatids.length; i++) {
          vchats.push({ id: res.data.chatids[i], name: res.data.chatnames[i] });
        }
        setChats(vchats);
        subscribeNotification(setIncomingCall)
      })
      .catch((e) => console.log(e));
  }, [load]);

  function handleLogout() {
    localStorage.clear();
  }

  useEffect(()=>{
    if(JSON.stringify(currChat) !== "{}")
    {
      setVisible(true)
      subscribe(currChat.id , currChat , setcurrChat , setVisible);
   
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
      DeleteChat(chatid).then(setVisible(false)).catch(e=>console.log(e))
  }

  function rejectCall()
  {
    setIncomingCall({group:'', media:'' , current:false})
  }

  function acceptCall()
  {
    navigate(`/room/${incomingCall.group.id}`)
  }
  return (
    <div className="container">
      <h1>Hello {localStorage.getItem("username")}</h1>
      <Link to="/logout" onClick={handleLogout}>
        Logout
      </Link>
      { incomingCall.current && <div className="container"><b>Incoming {incomingCall.media} Call from group {incomingCall.group.name}</b><button className="btn btn-primary mx-2" onClick={acceptCall}>Accept</button><button className="btn btn-danger mx-2" onClick={rejectCall}>Reject</button></div>}
      <div className="row">
        <div className="col-sm">
          <div>
            <nav className="navbar navbar-light bg-light">
              <Link to={"/createGroup"}>Create a new Group</Link>
            </nav>
            <h3>Your Chats</h3>
            {chats.map(function (chat , idx) {
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
