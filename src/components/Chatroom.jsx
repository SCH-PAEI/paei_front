import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const ChatroomContainer = styled.div`
  padding: 20px;
`;

const ExitButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const PostInfo = styled.div`
  border-bottom: 1px solid #d6d6d6;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 1em;
  text-align: center;
`;

const InputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: white;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d6d6d6;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #7176ff;
  color: white;
  border: none;
  border-radius: 5px;
`;

function Chatroom() {
  const { userID } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/chatting");
  };

  return (
    <ChatroomContainer>
      <ExitButton onClick={handleExit}>나가기</ExitButton>{" "}
      <PostInfo>
        <Title>제목</Title>
        <Content>내용</Content>
      </PostInfo>
      <InputContainer>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton>전송</SendButton>
      </InputContainer>
    </ChatroomContainer>
  );
}

export default Chatroom;
