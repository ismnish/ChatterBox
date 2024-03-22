import React, { useEffect, useState } from "react";
import { user } from "../Join/Joint";
import socketIO from "socket.io-client";
import "./Chat.css";
import sendImg from "../../img/sendBtn2.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from '../../img/closeIcon.png';
import Logo from '../../img/Chatterboxlogo.png'
const ENDPOINT = "http://localhost:4500";
let socket;
const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);
  // const [activeMembers, setActiveMembers] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value.trim();
    if (message.length === 0) return;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      // alert("connected");
      setid(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("userJoined", (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on("welcome", (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on("leave", (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   socket.on("ActiveMembersPresent", (data) => {
  //     setActiveMembers(Object.values(data.users));
  //   });
  // }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });
    
    return () => {
      socket.off();
    };
  }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <img src={Logo} alt="" />
          <h1>Chatting Application</h1>
          <a href="/"> <img id="closeIcon" src={closeIcon} alt="leave" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              key={i}
              user={item.id === id ? "" : item.user}
              message={item.message}
              userClass={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyDown={(e) => e.key === 'Enter' ? send() : null} type="text" id="chatInput" />
          <button onClick={send} className="sendBtn">
            <img id="sendBtnImg" src={sendImg} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
