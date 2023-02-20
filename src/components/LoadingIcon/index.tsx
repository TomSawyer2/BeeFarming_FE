import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

interface IProps {
  loading: boolean;
}

const LoadingIcon = (props: IProps) => {
  const { loading } = props;
  return loading ? (
    <Spin
      indicator={
        <LoadingOutlined
          style={{ fontSize: 16 }}
          spin
        />
      }
    />
  ) : (
    <CheckOutlined style={{ color: 'green' }} />
  );
};

export default LoadingIcon;
