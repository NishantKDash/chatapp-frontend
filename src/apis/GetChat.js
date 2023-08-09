import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function GetChat(username)
{
    return axiosClient.get(`/api/${username}/chats` , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}