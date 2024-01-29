import React, { useState } from "react";
import App from "../App";
import Register from "../components/Resister";
import styled from "styled-components";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [ID, setID] = useState("");
  const [PW, setPassword] = useState("");
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);
  const handleLogin = async () => {
    const response = await fetch("http://localhost:3003/members");
    const members = await response.json();

    //입력한 ID와 PW가 일치하는 user 찾기
    const user = members.find(
      (member) => member.userID === ID && member.userPW === PW
    );

    if (user) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("로그인 실패함");
    }
  };

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
