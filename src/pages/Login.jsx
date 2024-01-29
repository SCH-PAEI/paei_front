import React, { useState, useEffect } from "react";
import App from "../App";
import Register from "../components/Resister";
import UserInfo from "../components/UserInfo";
import styled from "styled-components";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [ID, setID] = useState("");
  const [PW, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const [userInfoCompleted, setUserInfoCompleted] = useState(null);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  const handleClick = () => setShow(!show);
  const handleLogin = async () => {
    const response = await fetch("http://localhost:3003/members");
    const members = await response.json();

    // 입력한 ID와 PW가 일치하는 user 찾기
    const user = members.find(
      (member) => member.userID === ID && member.userPW === PW
    );

    if (user) {
      setIsLoggedIn(true);
      setUserInfoCompleted(
        user.userInfoCompleted !== undefined ? user.userInfoCompleted : false
      ); // userInfoCompleted 상태가 undefined이면 false로 설정
      setError("");
    } else {
      setError("로그인 실패함");
    }
  };

  useEffect(() => {
    if (isLoggedIn && userInfoCompleted === false) {
      setShowPersonalInfo(true); // 로그인이 되었고, 개인 정보가 설정되지 않았으면, 개인 정보 설정 화면 표시
    }
  }, [isLoggedIn, userInfoCompleted]);

  if (showPersonalInfo) {
    return <UserInfo />; // 개인 정보 설정 화면을 표시
  }
  if (isLoggedIn) {
    return <App />;
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="ID"
          value={ID}
          onChange={(e) => setID(e.target.value)}></input>
        <input
          type={show ? "text" : "password"}
          placeholder="password"
          value={PW}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Submit</button>
        <Register />
      </div>
    </>
  );
};

export default Login;
