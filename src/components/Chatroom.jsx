import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

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
  const [post, setPost] = useState(null);
  const { chatroomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // chatrooms 전체 데이터를 가져옵니다.
        const chatroomsResponse = await axios.get(
          `http://localhost:3003/chatrooms`
        );
        const chatrooms = chatroomsResponse.data;
        console.log("chatrooms:", chatrooms); // chatrooms 데이터 확인

        // chatrooms에서 chatroomId가 일치하는 데이터를 찾습니다.
        const matchedChatroom = chatrooms.find(
          (room) => room.chatroomId === chatroomId
        );
        console.log("chatroom:", matchedChatroom); // chatroom 데이터 확인

        if (!matchedChatroom) {
          console.error("chatroom not found");
          return;
        }

        // 찾은 데이터에서 postId를 가져와 해당하는 게시물을 가져옵니다.
        const postResponse = await axios.get(
          `http://localhost:3003/posts/${matchedChatroom.postId}`
        );
        setPost(postResponse.data);
        console.log("post:", postResponse.data); // post 데이터 확인
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [chatroomId]);

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
        <span>{post ? post.currentMembers + 1 : "Loading..."}</span>{" "}
        {/* post의 currentMembers를 사용하여 참여중인 회원 수를 표시합니다. */}
      </MemberInfo>
      <PostInfo>
        <Title>{post ? post.title : "Loading..."}</Title>
        <Content>{post ? post.content : "Loading..."}</Content>
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
