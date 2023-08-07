import React, { useEffect, useState } from 'react'
import GetUser from '../apis/GetUser'
 function CreateGroup() {

    let [usernames,SetUsernames] = useState([])
    let [chatuser , SetChatUser] = useState([])

    useEffect(()=>{getUsers()},[])

    async function getUsers()
    {
        let response = await GetUser()
        SetUsernames(response.data)
    }

  return (
    <div class='container'>
          {usernames.map(function(username) {
      return (
        <div>
          UserName:  {username}
        </div>
      )
    })}
    </div>
  )
}

export default CreateGroup