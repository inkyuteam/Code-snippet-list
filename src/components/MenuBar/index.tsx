import { useState } from "react";
import "./index.scss";
import { MenuBarProps, snippetType } from "../../interfaces";

const MenuBar: React.FC<MenuBarProps> = ({
  currentMenuIndex,
  menus,
  setMenuIndex,
  setBinIndex,
  addNewSnippet,
  searchText,
  searchFilter,
}) => {
  const isFiltered = (item: snippetType) => {
    switch (searchFilter) {
      case "ALL":
        return (
          item.title.toUpperCase().includes(searchText.toUpperCase()) ||
          item.description.toUpperCase().includes(searchText.toUpperCase())
        );
        break;
      case "TITLE":
        return item.title.toUpperCase().includes(searchText.toUpperCase());
        break;
      case "DESCRIPTION":
        return item.description
          .toUpperCase()
          .includes(searchText.toUpperCase());
    }
    return false;
  };
  const handleMenuClick = (index: number) => {
    setMenuIndex(index);
  };
  const handleBinClick = (index: number, event) => {
    event.stopPropagation();
    setBinIndex(index);
  };
  const handleAddClick = () => {
    addNewSnippet();
  };
  return (
    <>
      <div className="menu-bar">
        <div className="menu plus-menu" onClick={handleAddClick}>
          ➕ Add New
        </div>
        {menus.map((item, index) => {
          return (
            isFiltered(item) === true && (
              <div
                className={`menu ${currentMenuIndex === index ? "active" : ""}`}
                onClick={() => handleMenuClick(index)}
                key={index}
              >
                <div className="title">{item.title}</div>
                <div
                  className="bin"
                  onClick={(event) => handleBinClick(index, event)}
                >
                  ✖
                </div>
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default MenuBar;
