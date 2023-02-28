import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import { Button, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UserInfo } from '@/services/user';
import { UserPermission, UserStatus } from '@/const/typings';
import { banUser, getAdminUserInfo, unbanUser } from '@/services/admin';

const User = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserInfo[]>([]);

  const columns: ColumnsType<UserInfo> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      render: (_, { permission }) => {
        switch (permission) {
          case UserPermission.User:
            return '普通用户';
          case UserPermission.Admin:
            return '管理员';
          case UserPermission.Banned:
            return '已封禁';
          default:
            return '未知';
        }
      },
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => {
        switch (status) {
          case UserStatus.Normal:
            return '正常';
          case UserStatus.Running:
            return '运行中';
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: UserInfo) =>
        record.permission === UserPermission.Banned ? (
          <Button onClick={() => handleUnbanUser(record.id)}>解封</Button>
        ) : (
          <Button onClick={() => handleBanUser(record.id)}>封禁</Button>
        ),
    },
  ];

  const fetchUserList = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    const res = await getAdminUserInfo({ page, pageSize });
    const { total, userList } = res;
    setPage(page);
    setPageSize(pageSize);
    setTotal(total);
    setUserList(userList);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserList(page, pageSize);
  }, []);

  const refreshPage = useCallback(async () => {
    await fetchUserList(page, pageSize);
  }, []);

  const handleBanUser = useCallback(async (id: number) => {
    Modal.confirm({
      content: '确认封禁该用户？',
      centered: true,
      getContainer() {
        return document.getElementById('root') as HTMLElement;
      },
      onOk: async () => {
        try {
          await banUser({ userId: id });
        } catch (e) {
          console.error(e);
        }
        await refreshPage();
      },
    });
  }, []);

  const handleUnbanUser = useCallback(async (id: number) => {
    Modal.confirm({
      content: '确认解封该用户？',
      centered: true,
      getContainer() {
        return document.getElementById('root') as HTMLElement;
      },
      onOk: async () => {
        try {
          await unbanUser({ userId: id });
        } catch (e) {
          console.error(e);
        }
        await refreshPage();
      },
    });
  }, []);

  return (
    <div className={styles.user}>
      <Table
        loading={loading}
        columns={columns}
        dataSource={userList}
        rowKey={(record) => record.id}
        pagination={{
          hideOnSinglePage: true,
          pageSize,
          current: page,
          total,
          onChange(page, pageSize) {
            fetchUserList(page, pageSize);
          },
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
    </div>
  );
};

export default User;
