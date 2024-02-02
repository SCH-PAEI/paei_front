import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Chatting() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3003/chatrooms");
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div>
      <h1>참여 중인 채팅방</h1>
      {chatRooms.map((room) => (
        <div key={room.id}>
          <Link to={`/chatroom/${room.id}`}>
            <h2>{room.title}</h2>
            <p>{room.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Chatting;
