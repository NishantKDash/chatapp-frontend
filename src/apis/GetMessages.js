import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function GetMessages(chatid)
{
    return axiosClient.get(`/api/message/${chatid}` , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}