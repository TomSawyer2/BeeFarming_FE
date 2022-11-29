import Editor from '@/components/Editor';
import { Button } from 'antd';
import React, { useRef } from 'react';

import './index.less';

const BatchTasks: React.FC = () => {
  const editorRef = useRef(null);

  return (
    <div className="bt">
      <div className="bt-top">
        {/* @ts-ignore */}
        <Button onClick={() => console.log(editorRef.current?.getContent())}>获取代码内容</Button>
      </div>
      <div className="bt-editor">
        <Editor ref={editorRef} />
      </div>
    </div>
  );
};

export default BatchTasks;
