import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function GetUsersForChat(id)
{
    return axiosClient.get(`/api/chat/users/${id}` , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}