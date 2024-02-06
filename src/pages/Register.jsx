import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #989cfc;
`;

const RegisterText = styled.h1`
  color: white;
  font-size: 2.5em;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  justify-content: space-around;
`;

const RegisterInput = styled.input`
  padding: 0.5em;
  color: #333333;
  background: #fff;
  border: none;
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
`;

const RegisterButton = styled.button`
  color: #fff;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: #7176ff;
`;
function Register() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id.trim() === "" || password.trim() === "") {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      const response = await fetch(
        "https://rightful-marbled-glass.glitch.me/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: id,
            userPW: password,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLoginRedirect = () => {
    setModalIsOpen(false);
    navigate("/");
  };
  const customModalStyles = {
    content: {
      width: "70%",
      height: "50%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    button: {
      width: "100%",
      backgroundColor: "#7176ff",
      color: "white",
      padding: "10px 0",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };
  return (
    <RegisterContainer>
      <RegisterText>회원가입</RegisterText>
      <RegisterForm onSubmit={handleSubmit}>
        <RegisterInput
          type="text"
          placeholder="Username"
          onChange={handleIdChange}
        />
        <RegisterInput
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <RegisterButton type="submit">Register</RegisterButton>
      </RegisterForm>
      <Modal isOpen={modalIsOpen} style={customModalStyles} ariaHideApp={false}>
        <h2>회원가입이 완료되었습니다.</h2>
        <p>로그인하시겠습니까?</p>
        <button style={customModalStyles.button} onClick={handleLoginRedirect}>
          로그인하러 가기
        </button>
      </Modal>
    </RegisterContainer>
  );
}
export default Register;
