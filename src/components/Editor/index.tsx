import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

const Editor: React.FC = () => {
  const [monaco, setMonaco] = useState<any>();

  // useEffect(() => {
  //   self.MonacoEnvironment = {
  //     getWorker: function (workerId, label) {
  //       const getWorkerModule = (moduleUrl: string, label: string) => {
  //         return new Worker(self.MonacoEnvironment?.getWorkerUrl?.(moduleUrl, label) ?? '', {
  //           name: label,
  //           type: 'module',
  //         });
  //       };
  //       return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label);
  //     },
  //   };
  // }, []);

  return (
    <div style={{ height: '100vh' }}>
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
          fontSize: 20, // 字体
          language: 'java',
        }}
        editorDidMount={(editor, monacoItem) => setMonaco(monacoItem)}
      />
    </div>
  );
};

export default Editor;
