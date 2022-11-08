import React, { useState } from 'react';
import { Button, Col, Input, Row, Spin, Tooltip } from 'antd';

import HeaderBar from '@/components/HeaderBar';

import './index.less';

const Page: React.FC = () => {
  const [encodeData, setEncodeData] = useState<string>('');
  const [encodeImg, setEncodeImg] = useState<string>('');
  const [encodeLoading, setEncodeLoading] = useState<boolean>(false);

  const [decodeOutput, setDecodeOutput] = useState<string>('');
  const [decodeLoading, setDecodeLoading] = useState<boolean>(false);

  return (
    <div className="container">
      <HeaderBar />
      <Row className="qr">
        <Col
          className="qr-card"
          span={8}
        >
          <div className="encode">
            <Input.TextArea
              rows={4}
              allowClear
              className="encode-input"
              placeholder="请输入要编码的内容"
              autoSize={{ minRows: 4, maxRows: 4 }}
              onChange={(e) => setEncodeData(e.target.value)}
            />
            <div className="color-group">
              <div className="color-box">
                <span>背景色</span>
              </div>
              <div className="color-box">
                <span>填充色</span>
              </div>
            </div>
            <div className="encode-img">
              {encodeImg === '' ? (
                <div className="empty-img-box">{encodeLoading && <Spin />}</div>
              ) : (
                <div className="img-box">
                  {encodeLoading ? (
                    <Spin />
                  ) : (
                    <img
                      className="image"
                      src={encodeImg}
                    />
                  )}
                </div>
              )}
            </div>
            <div>
              <Button
                className="encode-btn"
                disabled={encodeData === '' || encodeLoading}
              >
                <span className="encode-btn-text">生成</span>
              </Button>
              <Button
                type="primary"
                className="encode-btn"
                disabled={encodeData === '' || encodeLoading}
              >
                <span className="encode-btn-text">保存</span>
              </Button>
            </div>
          </div>
        </Col>
        <Col
          className="qr-card"
          span={8}
        >
          <div className="decode">
            <div className="decode-output">
              {decodeLoading ? (
                <Spin />
              ) : (
                <Tooltip
                  placement="top"
                  title={decodeOutput}
                >
                  <span className="output-text">{decodeOutput}</span>
                </Tooltip>
              )}
            </div>
            <Button
              type="primary"
              className="decode-btn"
            >
              <span className="decode-btn-text">识别</span>
            </Button>
          </div>
        </Col>
      </Row>
      <div className="bg" />
    </div>
  );
};

export default Page;
