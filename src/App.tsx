import React, { useState, useEffect } from "react";
import ElectronSVG from "./electronjs-icon.svg";
import "./App.scss";
import MenuBar from "./components/MenuBar";
import CodeEditor from "./components/CodeEditor";
import SearchSnippets from "./components/SearchSnippets";
import SnippetHeader from "./components/SnippetHeader";
import Description from "./components/Description";

export const App: React.FC = () => {
  const localStorageKey = "CodeSnippetsManager";
  const initSnippet = {
    title: "New Snippet",
    description: "This is the snippet.",
    code: 'console.log("Hello World!")',
    mode: "javascript",
  };

  const [snippets, setSnippets] = useState([initSnippet]);

  const [searchText, setSearchText] = useState("");
  const [searchFilter, setSearchFilter] = useState("ALL");

  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);

  const [isDescription, setIsDescription] = useState(true);

  const handleMenuClick = (index) => {
    setCurrentSnippetIndex(index);
  };

  const handleBinClick = (index) => {
    const updatedSnippets = [...snippets];
    updatedSnippets.splice(index, 1);
    setSnippets(updatedSnippets);

    if (index >= updatedSnippets.length) {
      setCurrentSnippetIndex(updatedSnippets.length - 1);
    } else {
      setCurrentSnippetIndex(index);
    }
  };

  const handleCodeChange = (code) => {
    const updatedSnippets = snippets.map((item, index) => {
      return index === currentSnippetIndex ? { ...item, code: code } : item;
    });
    setSnippets(updatedSnippets);
  };

  const handleAddClick = () => {
    setSnippets([initSnippet, ...snippets]);
    setCurrentSnippetIndex(0);
  };

  const handleModeClick = (mode) => {
    const updatedSnippets = snippets.map((item, index) => {
      return index === currentSnippetIndex ? { ...item, mode: mode } : item;
    });
    setSnippets(updatedSnippets);
  };

  const handleTitleChange = (title) => {
    const updatedSnippets = snippets.map((item, index) => {
      return index === currentSnippetIndex ? { ...item, title: title } : item;
    });
    setSnippets(updatedSnippets);
  };

  const handleDescriptionChange = (description) => {
    const updatedSnippets = snippets.map((item, index) => {
      return index === currentSnippetIndex
        ? { ...item, description: description }
        : item;
    });
    setSnippets(updatedSnippets);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSearchFilterChange = (filter) => {
    setSearchFilter(filter);
  };

  useEffect(() => {
    const storedData = localStorage.getItem(localStorageKey);
    const loadedArray = JSON.parse(storedData);

    if (loadedArray?.length === 0) {
    } else {
      setSnippets(loadedArray);
    }
  }, []);

  useEffect(() => {
    const jsonString = JSON.stringify(snippets);
    localStorage.setItem(localStorageKey, jsonString);
  }, [snippets]);

  useEffect(() => {}, [searchText, searchFilter]);

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-title">Snippets Manager</div>
        <div>
          <SearchSnippets
            searchText={searchText}
            setSearchText={handleSearchTextChange}
            searchFilter={searchFilter}
            setSearchFilter={handleSearchFilterChange}
          />
        </div>
      </div>
      <div className="app-container">
        <div className="menu-bar">
          <MenuBar
            currentMenuIndex={currentSnippetIndex}
            menus={snippets}
            setMenuIndex={handleMenuClick}
            setBinIndex={handleBinClick}
            addNewSnippet={handleAddClick}
            searchText={searchText}
            searchFilter={searchFilter}
          />
        </div>
        <div className="main">
          <div className="code-editor-header">
            <SnippetHeader
              title={snippets[currentSnippetIndex]?.title}
              setTitle={handleTitleChange}
              currentMode={snippets[currentSnippetIndex]?.mode}
              setCurrentMode={handleModeClick}
              setIsDescription={setIsDescription}
            />
          </div>
          <div className="code-editor-container">
            {snippets?.length !== 0 && (
              <>
                <CodeEditor
                  index={currentSnippetIndex}
                  mode={snippets[currentSnippetIndex]?.mode}
                  code={snippets[currentSnippetIndex]?.code}
                  setCode={handleCodeChange}
                />
                {isDescription && (
                  <Description
                    index={currentSnippetIndex}
                    description={snippets[currentSnippetIndex]?.description}
                    setDescription={handleDescriptionChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="app-footer">
        <div>Number of snippets: {snippets?.length}</div>
        <div>Welcome to Code Snippet Manager! copyright@2023</div>
      </div>
    </div>
  );
};
