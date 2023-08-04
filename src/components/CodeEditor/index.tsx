import React, { useEffect, useRef } from "react";
import AceEditor from "react-ace";

// import "brace/mode/javascript";
// import "brace/mode/css";

const modesContext = require.context("brace/mode", false, /^.*\.js$/);
modesContext.keys().forEach(modesContext);

import "brace/theme/monokai";

const CodeEditor = ({ index, mode, code, setCode }) => {
  const editorRef = useRef(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  useEffect(() => {
    editorRef.current.editor.getSession().getUndoManager().reset();
  }, [index]);

  return (
    <AceEditor
      mode={mode}
      theme="monokai"
      onChange={handleCodeChange}
      name="code-editor"
      editorProps={{ $blockScrolling: true }}
      fontSize={14}
      width="100%"
      height="100%"
      wrapEnabled={true}
      value={code}
      ref={editorRef}
    />
  );
};

export default CodeEditor;
