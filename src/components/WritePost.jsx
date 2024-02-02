import React, { useState } from "react";
import axios from "axios";
import styled from "styledcomponents";

function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [maxMember, setMaxMember] = useState(1);
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");

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
    };

    try {
      const response = await axios.post(
        "http://localhost:3003/posts",
        postData
      );

      if (response.status == 201) {
        alert("post create successfully");
        setTitle("");
        setContent("");
        setMaxMember(1);
        setTag("");
        setLocation("");
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        제목:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        내용:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <label>
        장소:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label>
        신청 가능한 인원수:
        <input
          type="number"
          min="1"
          value={maxMember}
          onChange={(e) => setMaxMember(e.target.value)}
        />
      </label>
      <label>
        태그:
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">선택하세요</option>
          <option value="같이해요">같이해요</option>
          <option value="같이배달">같이배달</option>
          <option value="같이타요">같이타요</option>
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default WritePost;
