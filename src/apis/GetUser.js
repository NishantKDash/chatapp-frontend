import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function GetUser()
{
    return axiosClient.get('/api/getUsers' , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}