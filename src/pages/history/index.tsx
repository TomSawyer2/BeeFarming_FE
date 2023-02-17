import React, { useState } from 'react';
import { Button } from 'antd';
import { getHistory } from '@/services/user';

import './index.less';

const History: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(30);

  const handleHistory = async () => {
    try {
      const pageParams = {
        page,
        pageSize,
      };
      const res = await getHistory(pageParams);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="container">
      <Button
        onClick={() => {
          handleHistory();
        }}
      >
        Test
      </Button>
    </div>
  );
};

export default History;
