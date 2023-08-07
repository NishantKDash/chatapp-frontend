import React from "react";
import Card from "./Card";
import Message from "./Message";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1>Hello {localStorage.getItem("username")}</h1>
      <div className="row">
        <div className="col-sm">
          <div>
            <nav className="navbar navbar-light bg-light">
              <Link to={'/createGroup'}>Create a new Group</Link>
            </nav>
            <h3>Your Chats</h3>
            <Card></Card>
          </div>
        </div>
        <div className="col-lg">
          <h3>Messages of Chat1</h3>
          <Message></Message>
          <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Enter Message"/>
  <div class="input-group-append">
    <button class="btn btn-success" type="button">Send</button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
