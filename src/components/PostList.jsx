import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PostListContainer = styled.div`
  padding-bottom: 60px;
`;
function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <PostListContainer>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.timestamp}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </PostListContainer>
  );
}

export default PostList;
