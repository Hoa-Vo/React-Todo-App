import React from "react";
import Editor from "@monaco-editor/react";

function MonacoEditor(props) {
  return (
    <div>
      <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />
    </div>
  );
}

export default MonacoEditor;
