import React, { useState } from "react";
import styled from "styled-components";

const TagContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d6d6d6;
`;
const Tag = styled.div`
  width: 80px;
  height: 32px;
  margin-right: 10px;
  border: 2px solid ${(props) => (props.isSelected ? "#7176FF" : "#d6d6d6")};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;
const TagList = ({ setSelectedTag }) => {
  const [selectedTag, setSelected] = useState("");

  const handleClick = (tag) => {
    setSelectedTag(tag);
    setSelected(tag);
  };
  return (
    <TagContainer>
      <Tag onClick={() => handleClick("")} isSelected={selectedTag === ""}>
        전체
      </Tag>
      <Tag
        onClick={() => handleClick("같이해요")}
        isSelected={selectedTag === "같이해요"}>
        같이해요
      </Tag>
      <Tag
        onClick={() => handleClick("같이배달")}
        isSelected={selectedTag === "같이배달"}>
        같이배달
      </Tag>
      <Tag
        onClick={() => handleClick("같이타요")}
        isSelected={selectedTag === "같이타요"}>
        같이타요
      </Tag>
    </TagContainer>
  );
};

export default TagList;
