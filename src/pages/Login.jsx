import React, { useState } from "react";
import App from "../App";
import styled from "styled-components";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [ID, setID] = useState("");
  const [PW, setPassword] = useState("");
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);
  const handleLogin = () => {
    const validID = "test1";
    const validPW = "test";

    if (ID === validID && PW == validPW) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("로그인에 실패함");
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
      </div>
    </>
  );
};

export default Login;
