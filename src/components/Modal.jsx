import React, { useContext } from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import taxi from "../imgs/taxi.png";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  height: 50%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
  @media (min-width: 768px) {
    width: 85%;
    height: 65%;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  margin-top: 10px;
`;

const Content = styled.p`
  font-size: 1em;
  text-align: center;
  word-break: break-all;
`;

const Member = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #7176ff;
  color: white;
  width: 90%;
  padding: 1em;
  border-radius: 10px;
  border: none;
  outline: none;
`;
const Image = styled.img`
  width: 85%;
  height: auto;
  padding: 20px;
  border-radius: 20px;
  background-color: #f4f4f4;
  @media (min-width: 768px) {
    width: 85%;
  }
`;
function Modal({ isOpen, close, post }) {
  const navigate = useNavigate();
  const { userID } = useContext(UserContext);
  if (!isOpen) {
    return null;
  }

  const applyPost = async () => {
    try {
      if (post.userID === userID) {
        alert("직접 작성한 게시글에는 신청할 수 없습니다.");
        return;
      }

      const postResponse = await axios.get(
        `http://localhost:3003/posts/${post.id}`
      );

      if (postResponse.data) {
        const post = postResponse.data;

        // 신청한 사용자를 게시글에 추가
        const updatedPost = {
          ...post,
          currentMembers: post.currentMembers ? post.currentMembers + 1 : 1,
        };

        const response = await axios.put(
          `http://localhost:3003/posts/${post.id}`,
          updatedPost
        );

        if (response.status == 200) {
          // 해당 게시글의 채팅방 정보를 가져옴
          const chatroomResponse = await axios.get(
            `http://localhost:3003/chatrooms?postId=${post.id}`
          );

          if (chatroomResponse.data && chatroomResponse.data.length > 0) {
            const chatroomId = chatroomResponse.data[0].chatroomId;

            alert("파티 신청 성공");
            // 채팅방 URL로 이동
            window.location.href = `http://localhost:3000/chatroom/${chatroomId}`;
          } else {
            alert("채팅방 정보를 찾을 수 없음");
          }
        } else {
          alert("파티 신청 실패");
        }
      } else {
        alert("게시글이 존재하지 않음");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Error");
    }
  };

  return (
    <ModalBackground onClick={close}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>{post.title}</Title>
        <Image src={taxi} alt="Taxi" /> {/* 이미지 추가 */}
        <Content>{post.content}</Content>
        <Member>
          <FiUser size={20} />
          {post.currentMembers}/{post.maxMember}
        </Member>
        <Button onClick={applyPost}>신청하기</Button>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;
