import React, { useState } from "react";
import "./Join.css";
import logo from "../../img/Chatterboxlogo.png";
import { Link } from "react-router-dom";

let user;
const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Joint = () => {
  const [name, setname] = useState("");
  return (
    <div className="joinPage">
      <div className="joinContainer">
        <img className="" src={logo} alt="logo" />
        <h1 className="bg-[white] p-2">Chating Application</h1>
        <input
          onChange={(e) => setname(e.target.value)}
          type="text"
          id="joinInput"
          placeholder="Enter your name"
        />
        <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">
          <button onClick={sendUser} className="joinBtn">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Joint;
export { user };



