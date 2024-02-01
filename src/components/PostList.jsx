import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import TagList from "./TagList";

const PostListContainer = styled.div`
  padding-bottom: 60px;
`;
const Post = styled.div`
  border-top: 1px solid #d6d6d6;
  &:hover {
    background-color: #f5f5f5; // 마우스를 올렸을 때 배경색 변경
  }
`;
function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTag, setSelectedTag] = useState("");

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
  const filteredPosts = posts.filter(
    (post) =>
      (post.title.includes(searchTerm) || post.content.includes(searchTerm)) &&
      // post.tag가 undefined인 경우를 처리
      ((post.tag || "").includes(selectedTag) || selectedTag === "")
  );

  return (
    <PostListContainer>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TagList setSelectedTag={setSelectedTag} />
      {filteredPosts.map((post) => (
        <Post key={post.id} onClick={() => openModal(post)}>
          <h2>{post.title}</h2>
          <p>{post.timestamp}</p>
          <p>{post.content}</p>
          <p>{post.maxMember}</p>
          <p>{post.tag}</p>
        </Post>
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
