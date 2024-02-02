import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ChattingContainer = styled.div`
  padding-bottom: 60px;
  overflow-x: hidden;
`;

const ChatRoom = styled.div`
  border-bottom: 1px solid #d6d6d6;
  margin-bottom: 10px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ChatRoomHeader = styled.div`
  display: flex;
  align-items: center;
`;

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
    <ChattingContainer>
      <h1>참여 중인 채팅방</h1>
      {chatRooms.map((room) => (
        <ChatRoom key={room.id}>
          <ChatRoomHeader>
            <Link to={`/chatroom/${room.id}`}>
              <h2>{room.title}</h2>
              <p>{room.description}</p>
            </Link>
          </ChatRoomHeader>
        </ChatRoom>
      ))}
    </ChattingContainer>
  );
}

export default Chatting;
