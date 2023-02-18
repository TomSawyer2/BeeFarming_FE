import { UserInfoContextProps, userInfoContext } from '@/const/context';
import { UserPermission } from '@/const/typings';
import { Menu, message } from 'antd';
import React, { useContext, useState } from 'react';

import './index.less';
import { history } from 'umi';
import { useEffect } from 'react';
import User from './components/User';
import Code from './components/Code';
import BatchTasks from './components/BatchTasks';

const Admin = () => {
  const { userInfo } = useContext<UserInfoContextProps>(userInfoContext);
  if (userInfo.permission !== UserPermission.Admin) {
    message.warning('您没有权限访问该页面');
    return null;
  }

  const [selectedKey, setSelectedKey] = useState<string>('1');

  const handleMenuChange = (e: { key: string }) => {
    const { key } = e;
    setSelectedKey(key);
    switch (key) {
      case '1':
        history.push('/admin#user');
        break;
      case '2':
        history.push('/admin#code');
        break;
      case '3':
        history.push('/admin#batchTasks');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#user') {
      handleMenuChange({ key: '1' });
    } else if (hash === '#code') {
      handleMenuChange({ key: '2' });
    } else if (hash === '#batchTasks') {
      handleMenuChange({ key: '3' });
    } else {
      handleMenuChange({ key: '1' });
    }
  }, [window.location.hash]);

  return (
    <div className="admin">
      <div style={{ backgroundColor: 'black' }}>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          style={{ width: 200, height: `calc(100vh - 46px)` }}
          items={[
            {
              key: '1',
              title: '用户管理',
              label: '用户管理',
            },
            {
              key: '2',
              title: '代码管理',
              label: '代码管理',
            },
            {
              key: '3',
              title: '批处理任务管理',
              label: '批处理任务管理',
            },
          ]}
          onClick={(e) => handleMenuChange(e)}
        />
      </div>
      <div className="admin-info">
        {selectedKey === '1' && <User />}
        {selectedKey === '2' && <Code />}
        {selectedKey === '3' && <BatchTasks />}
      </div>
    </div>
  );
};

export default Admin;
