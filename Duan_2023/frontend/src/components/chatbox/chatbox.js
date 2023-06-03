import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./chatbox.css";

import { Link } from "react-router-dom";
import { AiTwotoneSetting, AiOutlineSend } from "react-icons/ai";
import Conversation from "../conversation/conversation";
import Message from "../message/message";
import ChatOnline from "../chatOnline/chatOnline";
import axios from "axios";
import { io } from "socket.io-client";
function Chatbox() {
  const [conversations, setConversations] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newmessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);
  useEffect(() => {
    const getConversations = async () => {
      await axios
        .get(`http://localhost:5000/conversation/${user.id}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setConversations(data.content);
        });
    };

    getConversations();
  }, [user.id]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/user/message` + currentChat?._id
        );
        setMessages(res.data.content);
      } catch (error) {
        console.log("error", error);
      }
    };
    getMessages();
  }, [currentChat]);

  console.log("mess", messages);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newmessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find((member) => member !== user.id);
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: receiverId,
      text: newmessage,
    });
    try {
      const res = await axios.post(
        "http://localhost:5000/user/message",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
            placeholder="Search for friends"
            className="chatMenuInput"
          ></input>
          {conversations?.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation Conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>

      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages?.map((m) => (
                  <div ref={scrollRef}>
                    <Message
                      message={m}
                      own={m.sender === user.id ? true : false}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write somthing..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newmessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>{" "}
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline onlineUsers={onlineUsers} currentId={user.id} />
        </div>
      </div>
    </div>
  );
}
export default Chatbox;
