import React, {useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { publishSignal , subscribeSignalling } from "../apis/SendChat";
import ReactPlayer from "react-player";
import Peer from "../service/webrtc";

function Room() {

  
  const param = useParams()
  let [done,isDone] = useState(false)
  let[streams,setStreams] = useState(null)
  let[remoteStream , setRemoteStream] = useState()

  
  useEffect(()=>{
  createMyStream()
  },[])

  useEffect(()=>{
    if(streams!==null)
    {
      subscribeSignalling(param.id , handleMessage)
      publishSignal(param.id , {event:'join', from:localStorage.getItem('username')})
    }
  },[streams])


  let handleMessage = (message)=>{
     if(message.event === "join" && message.from != localStorage.getItem('username'))
     {
      Peer.getOffer().then(offer=>{publishSignal(param.id , {event:'offer', from:localStorage.getItem('username') , data:offer})}).catch(e=>{console.log(e)})
     }
     if(message.event ==='offer' && message.from != localStorage.getItem('username'))
     {
         Peer.getAnswer(message.data).then((res)=>{publishSignal(param.id , {event:'answer' , from:localStorage.getItem('username') , data:res})}).catch(e=>{console.log(e)})
     }

     if(message.event === 'answer' && message.from != localStorage.getItem('username'))
     {
       Peer.setLocalDescription(message.data).then(res=>{console.log('call accepted')
       for(const track of streams.getTracks())
       {
        Peer.peer.addTrack(track , streams)
       }
      }).catch(e=>{console.log(e)})
     }
     
  }


    const createMyStream = async ()=>{
     await navigator.mediaDevices.getUserMedia({audio:true , video:false})
     .then(stream=>{setStreams(stream);
      Peer.peer.addEventListener('track' , async ev =>{
        const remoteStream = ev.streams;
        setRemoteStream(remoteStream)
        console.log(remoteStream)
      })
        isDone(true)})
     .catch(e=>{console.log(e)})
    
  }


  return (
    <div className="container">
      <div className="d-flex justify-content-center my-4">
        <h2>
          <b>Chat {param.id}</b>
          <h5>Hi {localStorage.getItem('username')}</h5>
        </h2>
      </div>
      <div className="container">
       { done &&  <ReactPlayer playing height='200px' width='200px' url={streams}></ReactPlayer>}
       { remoteStream &&  <ReactPlayer playing height='200px' width='200px' url={remoteStream}></ReactPlayer>}
      </div>
    </div>
  );
}

export default Room;
