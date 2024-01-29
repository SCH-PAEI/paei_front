import React from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 20px;
  padding-bottom: 10px;
`;

const SearchBox = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  flex-shrink: 0;
  background-color: #f3f3f3;
  border-radius: 10px;
  border: none;
  outline: none;
  padding-left: 20px;
`;

const Icon = styled(IoSearch)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: #acacac;
`;

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <SearchBox>
        <Input
          type="text"
          placeholder="파티 찾기"
          value={searchTerm}
          onChange={handleChange}
        />
        <Icon size={20} />
      </SearchBox>
    </Container>
  );
}

export default SearchBar;
