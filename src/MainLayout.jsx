import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MainLayout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default MainLayout;
