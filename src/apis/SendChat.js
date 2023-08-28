import { Client } from '@stomp/stompjs';

const client = new Client();
client.brokerURL = 'ws://localhost:8080/chatapp';

const notificationClient = new Client();
notificationClient.brokerURL = 'ws://localhost:8080/chatapp';

const signallingClient = new Client();
signallingClient.brokerURL = 'ws://localhost:8080/chatapp'

notificationClient.activate()
client.activate()
signallingClient.activate()

export function activate()
{
    client.activate()
}


    


export function deactivate()
{
    client.deactivate()
}

export function deactivateNotification()
{
    notificationClient.deactivate()
}

export function subscribe(chatid , currChat , setcurrChat , setVisible)
{
   const subscription = client.subscribe(`/chat/${chatid}`, message =>{let obj = JSON.parse(message.body); console.log(obj);setcurrChat({id:currChat.id , name:currChat.name , messages:[...currChat.messages, {username:obj.username,message:obj.message,timestamp:Date.now()}]}); setVisible(false)});
   
   return subscription;
}

export function subscribeNotification(setIncomingCall)
{
    const subscription = notificationClient.subscribe(`/chat/notification/${localStorage.getItem('username')}` , message => {let obj = JSON.parse(message.body); setIncomingCall({group:{id:obj.gid,name:obj.gname} , media:obj.media , current:true});})
    return subscription;
}

export function subscribeSignalling(id , handleMessage)
{
    const subscription = signallingClient.subscribe(`/chat/signal/${id}` , message=>{handleMessage(JSON.parse(message.body))})
    return subscription
}

export function unsubscribe(subscription)
{
    subscription.unsubscribe()
}


export function publish(chatid , message)
{
    client.publish({
        destination: `/app/socket_message/${chatid}`,
        body: JSON.stringify(message)
    });
}

export function publishNotification(usernames , id , message)
{
    for(let i in usernames)
    {
       if(usernames[i] !== localStorage.getItem('username'))
       {
        notificationClient.publish({
        destination:`/app/notification/${usernames[i]}/${id}`,
        body: JSON.stringify(message)
    })
       }
    }
}

export function publishSignal(id, message)
{
    signallingClient.publish({
        destination: `/app/signal/${id}`,
        body: JSON.stringify(message)
    });
}








