import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { history } from 'umi'
import { Button, message, Input } from 'antd';
import { login } from '@/services/user'

import './index.less';

const Page: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [messageApi, contextHolder] = message.useMessage();
  const user = {
    username: username,
    password: password
  }
  const handleLogin = () => {
    let result = login(user);
    result.then(
      (res) => {
        console.log(res);
        history.push('')
      }
     ).catch(e => {
      console.log(e);
      messageApi.warning(e);
    }) 
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
          <Link to={{ pathname: '/'}}>Forgot Password ?</Link>
          <Link to={{ pathname:'/register' }}>Sign up</Link>
        </div>
        {contextHolder} 
        <Button onClick={() => {handleLogin()}}>Login</Button>
      </form>
    </div>
  );
};

export default Page;

