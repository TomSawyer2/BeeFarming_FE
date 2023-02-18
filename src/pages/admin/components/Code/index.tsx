import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import { Table } from 'antd';
import { getAdminCode } from '@/services/admin';
import { CodeParams } from '@/services/user';
import { ColumnsType } from 'antd/es/table';
import EllipseModal from '@/components/EllipseModal';

const Code = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [codeList, setCodeList] = useState<CodeParams[]>([]);

  const columns: ColumnsType<CodeParams> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      render: (_, { content }) => (
        <EllipseModal
          content={content}
          maxLength={6}
        />
      ),
    },
    {
      title: '上传用户id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '代码类型',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  const fetchCodeList = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    const res = await getAdminCode({ page, pageSize });
    const { total, codeList } = res;
    setPage(page);
    setPageSize(pageSize);
    setTotal(total);
    setCodeList(codeList);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCodeList(page, pageSize);
  }, []);

  return (
    <div className={styles.code}>
      <Table
        loading={loading}
        columns={columns}
        dataSource={codeList}
        pagination={{
          hideOnSinglePage: true,
          pageSize,
          current: page,
          total,
          onChange(page, pageSize) {
            fetchCodeList(page, pageSize);
          },
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
    </div>
  );
};

export default Code;
