import React, { useState } from "react";
import axios from "axios";

function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const postData = {
      title: title,
      content: content,
      timestamp: date,
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
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default WritePost;
