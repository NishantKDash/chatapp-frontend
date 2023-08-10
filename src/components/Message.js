import React from 'react'
import SingleMessage from './SingleMessage'
import { useState } from 'react'
import { publish } from '../apis/SendChat'

function Message(props) {
 console.log(props)
  let [body , setBody] = useState({username:localStorage.getItem('username') , message :''})
 

  function handleClick()
  {
  publish(props.client , props.currChat.id , body)
  }

  function handleChange(e)
  {
      setBody({username:localStorage.getItem('username') , message: e.target.value})
  }
  return (
    <div>
      <h2>Chat {props.currChat.name}</h2>
      
      { props.currChat.messages.map(function(message) {
      return (
        <div className='container my-3'>
          <SingleMessage message = {message}></SingleMessage>
        </div>
      )
    }) }
            <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Type Message"
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button className="btn btn-success" type="button" onClick={handleClick}>
                Send
              </button>
            </div>
          </div>
      </div>
  )
}

export default Message