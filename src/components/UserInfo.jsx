import React, { useState } from "react";
import axios from "axios";

function UserInfo() {
  const [nickname, setNickname] = useState("");
  const [department, setDepartment] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleNumberInput = (e, setter) => {
    const re = /^[0-9\b]+$/; // 숫자와 백스페이스만 허용하는 정규식

    // 사용자가 입력한 값이 숫자이거나, 입력란이 비어있는 경우에만 setter를 호출합니다.
    if (e.target.value === "" || re.test(e.target.value)) {
      setter(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모든 입력란이 채워지지 않았을 경우
    if (!nickname || !department || !studentNumber || !accountNumber) {
      alert("모든 항목을 입력해주세요.");
      return; // 함수 실행 종료
    }

    const userInfo = {
      nickname: nickname,
      department: department,
      studentNumber: studentNumber,
      accountNumber: accountNumber,
    };

    try {
      const response = await axios.post(
        "http://localhost:3003/members",
        userInfo
      );

      if (response.status == 201) {
        alert("User info successfully saved");
        setNickname("");
        setDepartment("");
        setStudentNumber("");
        setAccountNumber("");
      } else {
        alert("Failed to save user info");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        닉네임:
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </label>
      <label>
        학과:
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </label>
      <label>
        학번:
        <input
          type="text"
          value={studentNumber}
          onChange={(e) => handleNumberInput(e, setStudentNumber)}
        />
      </label>
      <label>
        계좌번호:
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => handleNumberInput(e, setAccountNumber)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserInfo;
