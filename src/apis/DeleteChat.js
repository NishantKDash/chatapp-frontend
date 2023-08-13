import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function DeleteChat(id)
{
    return axiosClient.delete(`/api/chat/delete/${id}` ,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}