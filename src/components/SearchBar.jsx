// src/components/SearchBar.jsx
import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // تمرير قيمة البحث للمكون الأب في حالة الحاجة (مثلاً لفلترة المستخدمين)
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="ابحث عن مستخدمين..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;