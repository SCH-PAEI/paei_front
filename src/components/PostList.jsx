import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const PostListContainer = styled.div`
  padding-bottom: 60px;
`;
const Posthovered = styled.div`
  &:hover {
    background-color: #f5f5f5; // 마우스를 올렸을 때 배경색 변경
  }
`;
function PostList() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3003/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
  };
  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <PostListContainer>
      {posts.map((post) => (
        <Posthovered key={post.id} onClick={() => openModal(post)}>
          <h2>{post.title}</h2>
          <p>{post.timestamp}</p>
          <p>{post.content}</p>
        </Posthovered>
      ))}
      <Modal
        isOpen={selectedPost !== null}
        close={closeModal}
        post={selectedPost}
      />
    </PostListContainer>
  );
}

export default PostList;
