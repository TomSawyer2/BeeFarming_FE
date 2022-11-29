import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { history } from 'umi'
import { Button, message, Input } from 'antd';
import { login } from '@/services/user'

import './index.less';

const Page: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const user = {
    username,
    password
  }
  const handleLogin = async () => {
    try {
      const res = await login(user);
      console.log(res);
      history.push('')
      message.success('登录成功!');
      setTimeout(function () { history.push(''); }, 1000);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="box">
      <form>
        <h2>Sign in</h2>
        <div className="inputBox">
          <Input type="text" placeholder='Enter your username.' value={username} onChange= {(e) => {setUsername(e.target.value)}}/>
          <span>UserName</span>
          <i></i>
        </div>
        <div className="inputBox">
          <Input type="password" placeholder='Enter your password.' value={password} onChange= {(e) => {setPassword(e.target.value)}}/>
          <span>Password</span>
          <i></i>
        </div>
        <div className="links">
          <Link to={{ pathname:'/register' }}>Sign up</Link>
        </div>
        <Button className="login-btn" onClick={() => {handleLogin()}}>Login</Button>
      </form>
    </div>
  );
};

export default Page;

