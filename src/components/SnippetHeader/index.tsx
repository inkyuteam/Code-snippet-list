import { useState, useEffect } from "react";
import ace from "ace-builds/src-noconflict/ext-modelist";
import "./index.scss";
import { SnippetHeaderProps } from "../../interfaces";

const SnippetHeader: React.FC<SnippetHeaderProps> = ({
  title,
  setTitle,
  currentMode,
  setCurrentMode,
  setIsDescription,
}) => {
  const [modes, setModes] = useState<string[]>([]);
  useEffect(() => {
    import("ace-builds/src-noconflict/ext-modelist").then((modelist) => {
      const modes = modelist.modes;
      setModes(modes);
    });
  }, []);

  const handleDescriptionClick = () => {
    setIsDescription((item) => !item);
  };
  return (
    <div className="header-container">
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <select
          value={currentMode}
          onChange={(e) => setCurrentMode(e.target.value)}
          className="mode-select"
        >
          {modes.map((item, index) => {
            return (
              <option key={index} value={item.name}>
                {item.caption}
              </option>
            );
          })}
        </select>
      </div>
      <div className="description-button" onClick={handleDescriptionClick}>
        📜
      </div>
    </div>
  );
};

export default SnippetHeader;
