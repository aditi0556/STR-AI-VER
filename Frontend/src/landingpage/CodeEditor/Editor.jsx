import Editor from "@monaco-editor/react";
function Edit() {
  const code = "console.log('Monaco Editor!');";
  return (
    <Editor
      height="500px"
      width="800px"
      language="c++"
      theme="vs"
      value={code}
      options={{
        inlineSuggest: true,
        fontSize: 16,
        formatOnType: true,
        autoClosingBrackets: true,
        minimap: { scale: 10 }
      }}
    />
  );
}
export default Edit;