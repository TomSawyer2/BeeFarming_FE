import React, { useState } from 'react';
import { history } from 'umi';
import { Button, message, Input } from 'antd';
import { register } from '@/services/user'


import './index.less';

const Page: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [messageApi, contextHolder] = message.useMessage();
  const user = {
    username: username,
    password: password
  }
  const handleRegister = () => {
    register(user).then(
      (res) => {
        console.log(res);
        messageApi.success('注册成功！正在为您跳转');
        setTimeout(function() {history.push('');}, 1000)
      }
    )
    .catch(e => {
      console.log(e);
      messageApi.warning(e)
    })
  }
  return (
    <div className="box">
      <form>
        <h2>Sign up</h2>
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
        {contextHolder}
        <Button value="Register" onClick={handleRegister.bind(this)}>Register</Button>
      </form>
    </div>
  );
};

export default Page;