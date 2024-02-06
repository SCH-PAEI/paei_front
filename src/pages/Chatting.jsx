import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";

const ChattingContainer = styled.div`
  padding-bottom: 60px;
  overflow-x: hidden;
  padding-top: 10px;
`;

const PartyTalk = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: bold;
  left: 5px;
  margin-bottom: 20px;
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
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
function Chatting() {
  const [chatRooms, setChatRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      <PartyTalk>파티톡</PartyTalk>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {chatRooms
        .filter((room) => room.title.includes(searchTerm)) // 검색어에 일치하는 채팅방만 필터링
        .map((room) => (
          <ChatRoom key={room.id}>
            <ChatRoomHeader>
              <StyledLink to={`/chatroom/${room.chatroomId}`}>
                {" "}
                {/* 스타일이 적용된 Link 컴포넌트 사용 */}
                <h2 style={{ fontSize: "15px" }}>{room.title}</h2>
              </StyledLink>
            </ChatRoomHeader>
          </ChatRoom>
        ))}
    </ChattingContainer>
  );
}

export default Chatting;
