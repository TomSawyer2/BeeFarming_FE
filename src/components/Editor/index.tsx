import React, { forwardRef, useImperativeHandle, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import styles from './index.less';

interface EditorProps {
  ref: any;
}

// eslint-disable-next-line react/display-name
const Editor: React.FC<EditorProps> = forwardRef((props, ref) => {
  const [monaco, setMonaco] = useState<any>();
  useImperativeHandle(ref, () => ({
    getContent: (type: string) => {
      switch (type) {
        case 'honey-A':
          return monaco?.editor.getModels()[0].getValue();
        case 'hornet-A':
          return monaco?.editor.getModels()[1].getValue();
        case 'honey-B':
          return monaco?.editor.getModels()[2].getValue();
        case 'hornet-B':
          return monaco?.editor.getModels()[3].getValue();
        default:
          return 0;
      }
    },
  }));

  return (
    <div
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      className={styles.editor}
    >
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
