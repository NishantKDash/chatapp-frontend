import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function CreateChat(chat)
{
    return axiosClient.post('/api/chat/create' , chat , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}