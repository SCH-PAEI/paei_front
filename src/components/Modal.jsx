import React from "react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";

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
  if (!isOpen) {
    return null;
  }

  const members = post.members || 0;

  return (
    <ModalBackground onClick={close}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>{post.title}</Title>
        <Content>{post.content}</Content>
        <Member>
          <FiUser size={20} />
          {members}/{post.maxMember}
        </Member>
        <Button>신청하기</Button>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;
