import React, { useState } from "react";

function Users(props) {
  let [present , setPresent] = useState(false)
  const handleClick = (user) => () => {
    props.SetChatUser([...props.chatuser , user])
    setPresent(true)
  };

  const handleRemove = (user) => () => {

    props.SetChatUser(props.chatuser.filter((ele)=> ele !== user))
     setPresent(false)
  };


  return (
    <div>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{props.name}</li>
          <div className="container my-2">
          {!present && <button className='btn btn-success'onClick={handleClick(props.name)}>Add</button>}
          {present && <button className="btn btn-danger mx-2" onClick={handleRemove(props.name)}>Remove</button>}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Users;
