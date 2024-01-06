import React from "react";
import styled from "styled-components";

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
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  height: 50%;
  width: 70%;
  @media (min-width: 768px) {
    width: 85%;
  }
`;

function Modal({ isOpen, close, post }) {
  if (!isOpen) {
    return null;
  }
  return (
    <ModalBackground onClick={close}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <h3>{post.title}</h3>
        <h3>{post.timestamp}</h3>
        <h3>{post.content}</h3>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;
