import React from "react";
import styled from "styled-components";

const TagContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: 10px;
`;
const Tag = styled.div`
  margin-right: 5px;
  border: 1px solid red;
  border-radius: 5px;
`;
const TagList = ({ setSelectedTag }) => {
  return (
    <TagContainer>
      <Tag onClick={() => setSelectedTag("")}>전체</Tag>
      <Tag onClick={() => setSelectedTag("같이해요")}>같이해요</Tag>
      <Tag onClick={() => setSelectedTag("같이배달")}>같이배달</Tag>
      <Tag onClick={() => setSelectedTag("같이타요")}>같이타요</Tag>
    </TagContainer>
  );
};

export default TagList;
