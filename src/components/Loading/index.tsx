import React from 'react';
import { Spin, Button } from 'antd';

import './index.less';

const Loading: React.FC = () => {
  return (
    <div className="bg">
      <div className="box">
        <Spin tip="Loading"></Spin>
        <Button
          onClick={() => {}}
          className="cancel"
        >
          取消运行
        </Button>
      </div>
    </div>
  );
};

export default Loading;
