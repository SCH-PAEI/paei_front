import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
const Title = styled.h1`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #acacac;
  padding-bottom: 10px;
  & > :first-child {
    position: absolute;
    left: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Label = styled.label`
  margin-top: 10px;
  font-size: 14px;
  color: #acacac;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  padding: 5px;
  border-radius: 5px;
  background-color: #f3f3f3;
  color: #acacac;
`;

const SubmitButton = styled.button`
  position: fixed;
  bottom: 20px;
  margin-top: 20px;
  padding: 10px;
  width: 90%;
  color: white;
  background-color: #7176ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

function UserInfo() {
  const { userID } = useParams();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [department, setDepartment] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleNumberInput = (e, setter) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setter(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nickname || !department || !studentNumber || !accountNumber) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const userInfo = {
      nickname: nickname,
      department: department,
      studentNumber: studentNumber,
      accountNumber: accountNumber,
    };

    try {
      const response = await axios.patch(
        `http://localhost:3003/members/${userID}`,
        userInfo
      );

      if (response.status == 200) {
        alert("User info successfully saved");
        setNickname("");
        setDepartment("");
        setStudentNumber("");
        setAccountNumber("");
        navigate("/home");
      } else {
        alert("Failed to save user info");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Error");
    }
  };

  const handleIconClick = () => {};

  return (
    <div>
      <Title>
        <FiX size={24} onClick={handleIconClick} />
        사용자 정보 입력
      </Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          닉네임:
          <Input
            type="text"
            placeholder="사용할 닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Label>
        <Label>
          학과:
          <Input
            type="text"
            placeholder="소속 학과를 입력해주세요 "
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Label>
        <Label>
          학번:
          <Input
            type="text"
            placeholder="학번을 입력해주세요(예: 20학번)"
            value={studentNumber}
            onChange={(e) => handleNumberInput(e, setStudentNumber)}
          />
        </Label>
        <Label>
          계좌번호:
          <Input
            type="text"
            placeholder="계좌번호를 입력해주세요(은행명 계좌번호)"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </Label>
        <SubmitButton type="submit">입력하기</SubmitButton>
      </Form>
    </div>
  );
}

export default UserInfo;
