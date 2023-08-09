import React from "react";

function Users(props) {

  const handleClick = (user) => () => {
    props.SetChatUser([...props.chatuser , user])
  };
  return (
    <div>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{props.name}</li>
          <button onClick={handleClick(props.name)}>Add</button>
        </ul>
      </div>
    </div>
  );
}

export default Users;
