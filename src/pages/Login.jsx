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
    <>
      <div>
        <input
          type="text"
          placeholder="ID"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
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
