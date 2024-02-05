import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App"; // UserContext를 임포트합니다.
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UserInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
`;

const UserInfoText = styled.p`
  margin: 0;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: #6c63ff;
  color: white;
  cursor: pointer;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
`;

const MyPostsTitle = styled.h2`
  font-size: 15px;
  font-weight: bold;
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  margin-bottom: 10px;
`;

const MyPage = () => {
  const { userID } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 사용자 정보를 가져오는 함수
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3003/members/${userID}`);
      const userInfo = await response.json();
      setUser(userInfo);
    };

    // 사용자가 작성한 게시글을 가져오는 함수
    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:3003/posts?userID=${userID}`
      );
      const userPosts = await response.json();
      setPosts(userPosts);
    };

    fetchUser();
    fetchPosts();
  }, [userID]);

  if (!user || posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserInfoBox>
        <div>
          <UserInfoText>닉네임: {user.nickname}</UserInfoText>
          <UserInfoText>아이디: {user.id}</UserInfoText>
          <UserInfoText>학번: {user.studentNumber}</UserInfoText>
          <UserInfoText>학과: {user.department}</UserInfoText>
        </div>
        <EditButton onClick={() => navigate(`/userinfo/${userID}`)}>
          수정
        </EditButton>
      </UserInfoBox>
      <Divider />
      <MyPostsTitle>내가 쓴 글</MyPostsTitle>
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id}>{post.title}</PostItem>
        ))}
      </PostList>
    </div>
  );
};

export default MyPage;
