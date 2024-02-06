import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

  @media (min-width: 768px) {
    width: 81.5%;
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
  const { setUserID } = useContext(UserContext);
  const handleClick = () => setShow(!show);
  const handleRegister = () => {
    navigate("/register"); // '/register' 경로로 이동
  };
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (ID.trim() === "" || PW.trim() === "") {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

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

        navigate("/home"); // 로그인 성공 시 /home으로 이동
      } else {
        setUserInfoCompleted(false);
        navigate(`/userinfo/${user.id}`); // 사용자 정보가 완성되지 않았을 경우 /userinfo로 이동하면서 userID 전달
      }
      setError("");
    } else {
      alert("등록되지 않은 사용자입니다. 아이디와 패스워드를 확인해 주세요");
    }
  };

  useEffect(() => {
    if (isLoggedIn && userInfoCompleted === false) {
      setShowPersonalInfo(true);
    }
  }, [isLoggedIn, userInfoCompleted]);

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
      <Button onClick={handleLogin}>시작하기</Button>
      <RegisterText onClick={handleRegister}>회원가입</RegisterText>
    </LoginContainer>
  );
};

export default Login;
