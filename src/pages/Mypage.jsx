import React, { useContext, useEffect, useState } from "react";
import { FiSettings, FiEdit3, FiMoreVertical } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { UserContext } from "../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Avatar from "../imgs/Group 311.png";

const PageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const TitleText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const SettingIcon = styled(FiSettings)`
  font-size: 20px;
  cursor: pointer;
`;

const UserInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 5px solid #ddd;
`;

const UserDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const UserAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #acacac;
`;

const UserName = styled.h2`
  flex-grow: 1;
  margin: 0 20px;
  font-size: 20px;
  font-weight: bold;
`;

const EditIcon = styled(FiEdit3)`
  font-size: 20px;
  color: #6c63ff;
  cursor: pointer;
`;
const MyPostsTitle = styled.h2`
  font-size: 15px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 15px;
  padding-left: 10px;
  border-bottom: 1px solid #ddd;
`;

const PostItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
`;

const PostTitle = styled.h3`
  font-size: 12px;
  font-weight: bold;
`;

const PostContent = styled.p`
  font-size: 10px;
`;
const Posttime = styled.p`
  font-size: 10px;
  color: #acacac;
`;
const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;
const MoreIcon = styled(FiMoreVertical)`
  font-size: 15px;
  cursor: pointer;
`;

// 팝업 메뉴 스타일
const PopupMenu = styled.div`
  position: absolute;
  width: 100px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  right: 10px;
  z-index: 1;
`;

const PopupMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const IconWrapper = styled.span`
  margin-right: 5px;
`;

const MyPage = () => {
  const { userID } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isPopupMenuOpen, setPopupMenuOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3003

      /members/${userID}`);
      const userInfo = await response.json();
      setUser(userInfo);
    };

    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:3003

        /posts?userID=${userID}`
      );
      const userPosts = await response.json();
      setPosts(userPosts);
    };

    fetchUser();
    fetchPosts();
  }, [userID]);

  const togglePopupMenu = (postId) => {
    setSelectedPostId(postId);
    setPopupMenuOpen(!isPopupMenuOpen);
  };

  const handleEditPost = () => {
    console.log(`포스트 ${selectedPostId} 수정`);
  };

  const handleDeletePost = () => {
    console.log(`포스트 ${selectedPostId} 삭제`);
  };

  return (
    <div>
      <PageTitle>
        <TitleText>마이페이지</TitleText>
        <SettingIcon />
      </PageTitle>
      {user && (
        <>
          <UserInfoBox>
            <UserDetail>
              <UserAvatar src={Avatar} alt="User avatar" />
              <UserName>{user.nickname}</UserName>
              <EditIcon onClick={() => navigate(`/userinfo/${userID}`)} />
            </UserDetail>
          </UserInfoBox>
          <MyPostsTitle>내가 쓴 글</MyPostsTitle>
          {posts.length === 0 ? (
            <p>게시글이 없습니다.</p>
          ) : (
            <PostList>
              {posts.map((post) => (
                <PostItem key={post.id}>
                  <div>
                    <Posttime>{post.timestamp}</Posttime>
                    <PostTitle>{post.title}</PostTitle>
                    <PostContent>{post.content}</PostContent>
                  </div>
                  <MoreIcon onClick={() => togglePopupMenu(post.id)} />
                  {isPopupMenuOpen && selectedPostId === post.id && (
                    <PopupMenu>
                      <PopupMenuItem onClick={handleEditPost}>
                        <IconWrapper>
                          <AiOutlineEdit />
                        </IconWrapper>
                        수정
                      </PopupMenuItem>
                      <PopupMenuItem onClick={handleDeletePost}>
                        <IconWrapper>
                          <AiOutlineDelete />
                        </IconWrapper>
                        삭제
                      </PopupMenuItem>
                    </PopupMenu>
                  )}
                </PostItem>
              ))}
            </PostList>
          )}
        </>
      )}
    </div>
  );
};

export default MyPage;
