import React from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  @media (min-width: 768px) {
    width: 85%;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
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
  position: absolute;
  bottom: 20px;
  background-color: #7176ff;
  color: white;
  align-self: center;
  width: 90%;
  padding: 1em;
  border-radius: 10px;
  border: none;
  outline: none;
`;

function Modal({ isOpen, close, post }) {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const applyPost = async () => {
    try {
      // 해당 게시글 정보를 가져옵니다.
      const postResponse = await axios.get(
        `http://localhost:3003/posts/${post.id}`
      );

      if (postResponse.data) {
        const post = postResponse.data;

        // 파티 정원 확인--오류
        if (post.currentMembers >= post.maxMembers) {
          alert("파티 정원이 가득찼습니다.");
          return;
        }

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
          alert("파티 신청 성공");
          navigate(`/chatting/${post.id}`);
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
