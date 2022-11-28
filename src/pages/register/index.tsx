import React, { useState } from 'react';
import { history } from 'umi';
import { Button, message, Input } from 'antd';
import { register } from '@/services/user'


import './index.less';

const Page: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const user = {
    username,
    password
  }
  const handleRegister = async () => {
    try {
      const res = await register(user);
      console.log(res);
      
      message.success('注册成功！正在为您跳转');
      setTimeout(function () { history.push(''); }, 1000);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="box">
      <form>
        <h2>Sign up</h2>
        <div className="inputBox">
          <Input type="text" placeholder='Enter your username.' value={username} onChange={(e) => { setUsername(e.target.value) }} />
          <span>UserName</span>
          <i></i>
        </div>
        <div className="inputBox">
          <Input type="password" placeholder='Enter your password.' value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <span>Password</span>
          <i></i>
        </div>
        <Button className="register-btn" value="Register" onClick={handleRegister}>Register</Button>
      </form>
    </div>
  );
};

export default Page;
