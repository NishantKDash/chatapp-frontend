import React, { useEffect, useState } from 'react'
import GetUser from '../apis/GetUser'
import Users from './Users'
import { useNavigate } from 'react-router-dom'
import CreateChat from '../apis/CreateChat'
 function CreateGroup() {

    let [usernames,SetUsernames] = useState([])
    let [chatuser , SetChatUser] = useState([])
    let [chatname , setChatName] = useState('')
    let navigate = useNavigate()

    function handleClick()
    {
         let chat = {usernames:chatuser , admin : localStorage.getItem('username') , name : chatname}
         CreateChat(chat).then(navigate('/home')).catch(e=>console.log(e))
         
    }

    function handleChange(e)
    {
        setChatName(e.target.value)
    }

    useEffect(()=>{getUsers()},[])

    async function getUsers()
    {
        let response = await GetUser()
        SetUsernames(response.data)
    }

  return (
    <div className='container'>
      <input type="text" className="form-control w-25 p-2 container my-3" id="chatname" placeholder='ChatName' onChange={handleChange}/>
      <h1>Users</h1>
          {usernames.map(function(username) {
      return (
        <div className='container my-3'>
          <Users name = {username} SetChatUser = {SetChatUser} chatuser = {chatuser}></Users>
        </div>
      )
    })}
    <button className='btn btn-success my-2'onClick={handleClick}>Create chat</button>
    </div>
  )
}

export default CreateGroup