import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import TagList from "./TagList";
import { FiUser } from "react-icons/fi";

const PostListContainer = styled.div`
  padding-bottom: 60px;
`;

const Post = styled.div`
  border-bottom: 1px solid #d6d6d6;
  margin-bottom: 10px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
`;

function timeDifference(current, previous) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + "초 전";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "분 전";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "시간 전";
  } else {
    const date = new Date(previous);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}

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
      ((post.tag || "").includes(selectedTag) || selectedTag === "")
  );

  return (
    <PostListContainer>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TagList setSelectedTag={setSelectedTag} />
      {filteredPosts.map((post) => (
        <Post key={post.id} onClick={() => openModal(post)}>
          <PostHeader>
            <span>{post.location}</span>
            <span> | </span>
            <span>{timeDifference(new Date(), new Date(post.timestamp))}</span>
          </PostHeader>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div>
            {post.maxMember > 0 &&
              Array(Number(post.maxMember))
                .fill()
                .map((_, i) => <FiUser key={i} />)}
          </div>
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
