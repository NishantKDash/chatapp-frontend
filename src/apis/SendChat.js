import { Client } from '@stomp/stompjs';

const client = new Client();
client.brokerURL = 'ws://localhost:8080/chatapp';

export function activate()
{
    client.activate()
}

export function deactivate()
{
    client.deactivate()
}

export function subscribe(chatid , currChat , setcurrChat , setVisible)
{
   const subscription = client.subscribe(`/chat/${chatid}`, message =>{let obj = JSON.parse(message.body); console.log(obj);setcurrChat({id:currChat.id , name:currChat.name , messages:[...currChat.messages, {username:obj.username,message:obj.message,timestamp:Date.now()}]}); setVisible(false)});
   
   return subscription;
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








