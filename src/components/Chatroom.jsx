import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import {
  AiOutlinePlus,
  AiOutlineArrowLeft,
  AiOutlineUser,
} from "react-icons/ai";
import { FiSend } from "react-icons/fi";
const ChatroomContainer = styled.div`
  padding: 20px;
`;

const ExitButton = styled(AiOutlineArrowLeft)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 20px;
  cursor: pointer;
`;
const MemberInfo = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  color: #7176ff;
`;

const UserIcon = styled(AiOutlineUser)`
  font-size: 20px;
  margin-right: 5px;
`;

const AddIcon = styled(AiOutlinePlus)`
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
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
  box-sizing: border-box;
`;

const Input = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d6d6d6;
`;
const SendButton = styled(FiSend)`
  font-size: 20px;
  color: #7176ff;
  padding-right: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const MessageList = styled.div`
  overflow: auto;
  height: calc(100% - 100px);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const MessageBox = styled.div`
  background-color: #d5d6ff;
  width: 60%;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  align-self: flex-end;
`;
function Chatroom() {
  const { userID } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/chatting");
  };

  const sendMessage = () => {
    setMessages([...messages, newMessage]);
    setNewMessage("");
  };

  return (
    <ChatroomContainer>
      <ExitButton onClick={handleExit} />
      <MemberInfo>
        <UserIcon />
        <span>4</span>
      </MemberInfo>
      <PostInfo>
        <Title>제목</Title>
        <Content>내용</Content>
      </PostInfo>
      <MessageList>
        {messages.map((message, index) => (
          <MessageBox key={index}>{message}</MessageBox>
        ))}
      </MessageList>
      <InputContainer>
        <AddIcon />
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton onClick={sendMessage} />
      </InputContainer>
    </ChatroomContainer>
  );
}

export default Chatroom;
