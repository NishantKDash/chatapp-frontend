import { Client } from '@stomp/stompjs';

export function createClient(chatid , currChat , setCurrChat)
{
    const client = new Client({
        brokerURL: 'ws://localhost:8080/chatapp',
        onConnect: () => {
          client.subscribe(`/chat/${chatid}`, message => setCurrChat({id:currChat.id , name:currChat.name ,messages: [...currChat.messages , {username:message.body.username , message:message.body.message , timestamp : Date.now()}]}));
        }
      });
      client.activate()
      return client;
}


export function publish(client , chatid , message)
{
    client.publish({
        destination: `/app/socket_message/${chatid}`,
        body: JSON.stringify(message)
    });
}

export function disconnect(client)
{
    client.deactivate()
}







