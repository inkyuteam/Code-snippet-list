import { useState } from "react";
import "./index.scss";

const SearchSnippets = ({
  searchText,
  setSearchText,
  searchFilter,
  setSearchFilter,
}) => {
  const [options, setOptions] = useState([
    { id: "all", name: "filter", value: "ALL" },
    { id: "title", name: "filter", value: "TITLE" },
    { id: "description", name: "filter", value: "DESCRIPTION" },
  ]);

  return (
    <div className="search-snippets-container">
      <input
        type="text"
        placeholder="Search by options"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />
      {options.map((item, index) => {
        return (
          <div key={item.id}>
            <input
              type="radio"
              id={item.id}
              name={item.name}
              value={item.value}
              checked={searchFilter === item.value}
              onChange={() => setSearchFilter(item.value)}
            />
            <label form={item.id} onClick={() => setSearchFilter(item.value)}>
              {item.value}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default SearchSnippets;
