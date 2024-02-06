import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Image from "../imgs/Group 32.png";
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

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const CategoryButton = styled.button`
  width: 30%;
  padding: 10px;
  margin: 5px;
  border: none;
  border-radius: 20px;
  border: ${(props) =>
    props.selected ? "2px solid #7176ff" : "1px solid grey"};
  background-color: white;
  color: black;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
`;

const Label = styled.label`
  margin-top: 10px;
  color: #acacac;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  padding: 5px;
  border-radius: 5px;
  background-color: #f3f3f3;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  border: none;
  padding: 5px;
  outline: none;
  border-radius: 5px;
  background-color: #f3f3f3;
`;

const SubmitButton = styled.button`
  position: fixed;
  bottom: 20px;
  margin-top: 20px;
  padding: 10px;
  width: 93%;
  color: white;
  background-color: #7176ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;
const ImageWrapper = styled.img`
  margin-top: 40px;
  width: 100%;
`;
function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [maxMember, setMaxMember] = useState(1);
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");
  const { userID } = useContext(UserContext);
  const navigate = useNavigate();
  const handleIconClick = () => {
    navigate("/home");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !location || !tag || maxMember < 1) {
      alert("모든 항목을 채우고, 인원수는 1명 이상 입력해주세요.");
      return;
    }

    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const postData = {
      title: title,
      content: content,
      timestamp: date,
      maxMember: maxMember,
      tag: tag,
      location: location,
      currentMembers: 0,
      userID: userID,
    };

    try {
      const response = await axios.post(
        `http://localhost:3003

        /posts?userID=${userID}`, // userID를 포함한 주소로 요청
        postData
      );

      if (response.status == 201) {
        alert("post create successfully");
        setTitle("");
        setContent("");
        setMaxMember(1);
        setTag("");
        setLocation("");

        const generateRandomString = (length) => {
          let result = "";
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          const charactersLength = characters.length;
          for (let i = 0; i < length; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          return result;
        };

        const chatroomData = {
          title: title,
          king: [userID],
          commonMember: [],
          postId: response.data.id,
          chatroomId: generateRandomString(10), // 현재 시간을 이용해 고유 아이디 생성
        };

        const chatroomResponse = await axios.post(
          "http://localhost:3003/chatrooms",
          chatroomData
        );
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Error");
    }
  };

  return (
    <div>
      <Title>
        <FiX size={24} onClick={handleIconClick} />
        파티 생성하기
      </Title>
      <CategoryContainer>
        <CategoryButton
          selected={tag === "같이배달"}
          onClick={() => setTag("같이배달")}>
          같이배달
        </CategoryButton>
        <CategoryButton
          selected={tag === "같이해요"}
          onClick={() => setTag("같이해요")}>
          같이해요
        </CategoryButton>
        <CategoryButton
          selected={tag === "같이타요"}
          onClick={() => setTag("같이타요")}>
          같이타요
        </CategoryButton>
      </CategoryContainer>
      <Form onSubmit={handleSubmit}>
        <Label>
          파티 이름
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Label>
        <Label>
          파티 설명
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Label>
        <Label>
          최대 인원
          <Input
            type="number"
            min="1"
            value={maxMember}
            onChange={(e) => setMaxMember(parseInt(e.target.value))}
          />
        </Label>
        <Label>
          파티 장소
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Label>
        <ImageWrapper src={Image} alt="User image" />
        <SubmitButton type="submit">파티 생성하기</SubmitButton>
      </Form>
    </div>
  );
}

export default WritePost;
