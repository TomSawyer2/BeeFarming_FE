import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import './index.less';


const HeaderBar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-box">
        <span className="navbar-title">Bee Farming </span>
        <Button className='batchtask' onClick={() => {history.push('/batchTasks')}}>批量处理</Button>
        <Button className='history' onClick={() => {history.push('/history')}}>历史记录</Button>
      </div>
    </div>
  );
};

export default HeaderBar;
