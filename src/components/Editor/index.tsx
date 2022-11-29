import React, { forwardRef, useImperativeHandle, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

interface EditorProps {
  ref: any;
}

// eslint-disable-next-line react/display-name
const Editor: React.FC<EditorProps> = forwardRef((props, ref) => {
  const [monaco, setMonaco] = useState<any>();

  useImperativeHandle(ref, () => ({
    getContent: () => {
      return monaco?.editor.getModels()[0].getValue();
    },
  }));

  return (
    <div style={{ height: '100%' }}>
      <MonacoEditor
        theme="vs-dark"
        language="java"
        options={{
          minimap: { enabled: true }, // 小地图
          automaticLayout: true, // 自动布局,
          codeLens: true,
          colorDecorators: true,
          contextmenu: true,
          readOnly: false, //是否只读
          formatOnPaste: true,
          overviewRulerBorder: false, // 滚动条的边框
          scrollBeyondLastLine: true,
          fontSize: 16, // 字体
          language: 'java',
        }}
        editorDidMount={(editor, monacoItem) => setMonaco(monacoItem)}
      />
    </div>
  );
});

export default Editor;
