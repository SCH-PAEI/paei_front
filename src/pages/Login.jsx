import React, { useState, useEffect } from "react";
import App from "../App";
import Register from "../components/Resister";
import UserInfo from "../components/UserInfo";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #989cfc;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 3em;
  text-align: center;
  margin-bottom: 40px;
`;

const LoginText = styled.p`
  color: #fff;
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
  width: 80%; // 반응형으로 너비 수정
  color: #fff;
`;

const Button = styled.button`
  background-color: #7176ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  width: 86%; // 반응형으로 너비 수정
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #615edf;
  }
`;
const RegisterText = styled.p`
  color: #fff;
  cursor: pointer;
`;

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [ID, setID] = useState("");
  const [PW, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const [userInfoCompleted, setUserInfoCompleted] = useState(null);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [userID, setUserID] = useState(null);

  const handleClick = () => setShow(!show);

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3003/members");
    const members = await response.json();

    const user = members.find(
      (member) => member.userID === ID && member.userPW === PW
    );

    if (user) {
      setIsLoggedIn(true);
      setUserID(user.id); // 로그인한 사용자의 ID 저장
      if (
        user.nickname &&
        user.department &&
        user.studentNumber &&
        user.accountNumber
      ) {
        setUserInfoCompleted(true);
      } else {
        setUserInfoCompleted(false);
      }
      setError("");
    } else {
      setError("로그인 실패함");
    }
  };

  useEffect(() => {
    if (isLoggedIn && userInfoCompleted === false) {
      setShowPersonalInfo(true);
    }
  }, [isLoggedIn, userInfoCompleted]);

  if (showPersonalInfo) {
    return <UserInfo userID={userID} />;
  }
  if (isLoggedIn) {
    return <App />;
  }

  return (
    <LoginContainer>
      <Title>PAEI</Title>
      <LoginText>로그인</LoginText>
      <Input
        type="text"
        placeholder="ID"
        value={ID}
        onChange={(e) => setID(e.target.value)}
      />
      <Input
        type={show ? "text" : "password"}
        placeholder="Password"
        value={PW}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Start</Button>
      <RegisterText onClick={handleClick}>Register</RegisterText>
    </LoginContainer>
  );
};

export default Login;
