import React, { useContext, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { history } from 'umi';
import './index.less';
import { UserPermission } from '@/const/typings';
import { UserInfoContextProps, userInfoContext } from '@/const/context';

const HeaderBar: React.FC = () => {
  const [currentKey, setCurrentKey] = useState<string>('1');
  const { userInfo } = useContext<UserInfoContextProps>(userInfoContext);

  const handleMenuClick = (e: { key: string }) => {
    const { key } = e;
    setCurrentKey(key);
    switch (key) {
      case '1':
        history.push('/batchTasks');
        break;
      case '2':
        history.push('/history');
        break;
      case '3':
        history.push('/admin');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/batchTasks') {
      setCurrentKey('1');
    } else if (path === '/history') {
      setCurrentKey('2');
    } else if (path.includes('/admin')) {
      setCurrentKey('3');
    }
  }, [window.location.pathname]);

  return (
    <div className="navbar">
      <div className="navbar-box">
        <span className="navbar-title">BeeFarming</span>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentKey]}
          className="navbar-menu"
          items={[
            {
              key: '1',
              label: '批量运行',
            },
            {
              key: '2',
              label: '历史记录',
            },
            userInfo?.permission === UserPermission.Admin
              ? {
                  key: '3',
                  label: '管理员',
                }
              : null,
          ]}
          onClick={(e) => handleMenuClick(e)}
        />
      </div>
    </div>
  );
};

export default HeaderBar;
