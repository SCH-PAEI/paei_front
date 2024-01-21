import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="검색어를 입력하세요"
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
