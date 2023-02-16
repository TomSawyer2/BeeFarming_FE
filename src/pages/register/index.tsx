import React, { useState } from 'react';
import { history } from 'umi';
import { Button, message, Input } from 'antd';
import { register } from '@/services/user';

import './index.less';

const Page: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async () => {
    try {
      await register({
        username,
        password,
      });
      message.success('注册成功！正在为您跳转');
      setTimeout(() => {
        history.push('');
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="box">
      <form>
        <h2>注册</h2>
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>密码</span>
          <i></i>
        </div>
        <Button
          className="register-btn"
          value="Register"
          onClick={() => handleRegister()}
        >
          注册
        </Button>
      </form>
    </div>
  );
};

export default Page;
