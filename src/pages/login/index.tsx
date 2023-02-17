import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { history } from 'umi';
import { Button, message, Input } from 'antd';
import { login } from '@/services/user';

import './index.less';

const Page: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const user = {
        username,
        password,
      };
      const token = await login(user);
      window.localStorage.setItem('token', token);
      message.success('登录成功!');
      setTimeout(() => {
        history.push('/batchTasks');
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="box">
      <form>
        <h2>登录</h2>
        <div className="inputBox">
          <Input
            type="text"
            placeholder="账户"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>账户</span>
          <i></i>
        </div>
        <div className="inputBox">
          <Input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>密码</span>
          <i></i>
        </div>
        <div className="links">
          <Link to={{ pathname: '/register' }}>注册</Link>
        </div>
        <Button
          className="login-btn"
          onClick={() => handleLogin()}
        >
          登录
        </Button>
      </form>
    </div>
  );
};

export default Page;
