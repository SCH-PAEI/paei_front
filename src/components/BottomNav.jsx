import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { RiHome3Line } from "react-icons/ri";
import { AiOutlinePushpin } from "react-icons/ai";
import { PiPencilSimple } from "react-icons/pi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { PiFinnTheHuman } from "react-icons/pi";

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  width: 100%;
  overflow: visible;
  display: flex;
  background-color: white;
  justify-content: space-around; // 아이템들 간격 동일하게
  border-top: 1px solid #d6d6d6; // 상단 테두리 설정
`;

const NavItem = styled.div`
  text-align: center;
  width: 20%;
  float: left;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #989cfc;
  width: 50px;
  height: 50px;
  position: relative;
  bottom: 15px;
`;

const BottomNav = () => {
  return (
    <NavBar>
      <NavItem>
        <Link to="/">
          <RiHome3Line size="25" color="black" />
        </Link>
      </NavItem>
      <NavItem>
        <Link to="club">
          <AiOutlinePushpin size="25" color="black" />
        </Link>
      </NavItem>
      <NavItem>
        <Link to="post">
          <IconWrapper>
            <PiPencilSimple size="25" color="white" />
          </IconWrapper>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="chatting">
          <IoChatbubbleEllipsesOutline size="25" color="black" />
        </Link>
      </NavItem>
      <NavItem>
        <Link to="mypage">
          <PiFinnTheHuman size="25" color="black" />
        </Link>
      </NavItem>
    </NavBar>
  );
};

export default BottomNav;
