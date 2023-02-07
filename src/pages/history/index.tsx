import React, { useState } from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import { getHistory } from '@/services/user'

import HeaderBar from '@/components/HeaderBar';

import './index.less';

const History: React.FC = () => {

// static getDerivedStateFromProps()
const [page, setPage] = useState<number>(1);
const [pageSize, setPageSize] = useState<number>(30);
const pageParams = {
  page, 
  pageSize
}

const handleHistory = async () => {
  try{
    const res = await getHistory(pageParams);
    console.log(res);
  } catch(e) {
    console.log(e);
  }
}
  return (
    <div className="container">
      <div className="bt-top">
        <HeaderBar /> 
      </div>
        <Button onClick={() => {handleHistory()}}>Test</Button>
      <div className="bg" />
    </div>
  );
};

export default History;
