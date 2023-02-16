import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import HeaderBar from '@/components/HeaderBar';

import './index.less';

const Page: React.FC = () => {
  return (
    <div className="container">
      <HeaderBar />
      <div className="mainbody">
        <Button
          type="primary"
          onClick={() => {
            history.push('/batchTasks');
          }}
        >
          批量运行
        </Button>
        <Button
          type="primary"
          onClick={() => {
            history.push('/history');
          }}
        >
          历史记录
        </Button>
      </div>
    </div>
  );
};

export default Page;
