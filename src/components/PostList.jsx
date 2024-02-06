import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import TagList from "./TagList";
import { FiUser } from "react-icons/fi";

const PostListContainer = styled.div`
  padding-bottom: 60px;
  overflow-x: hidden;
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
  color: #acacac;
  font-size: 12px;

  span:not(:last-child)::after {
    content: "|";
    margin: 0 5px; // 장소와 시간 사이의 공백 추가
  }
`;

const Content = styled.p`
  font-size: 10px; // 내용 글자 크기를 10px로 변경
`;

const Title = styled.h2`
  font-size: 12px;
  font-weight: bold;
  color: black;
`;

const UserIcon = styled(FiUser)`
  width: 16px;
  height: auto;
  margin-right: 12px;
  color: ${(props) =>
    props.isFilled ? "#7176ff" : "#acacac"}; // 참여자 숫자만큼 아이콘 색상 변경
  &:last-child {
    margin-right: 0;
  }
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
    fetch("https://rightful-marbled-glass.glitch.me/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.reverse()));
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
            <span>{timeDifference(new Date(), new Date(post.timestamp))}</span>
          </PostHeader>
          <Title>{post.title}</Title>
          <Content>{post.content}</Content>
          <div>
            {Array(Number(post.maxMember))
              .fill()
              .map((_, i) => (
                <UserIcon key={i} isFilled={i < post.currentMembers} />
              ))}
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
