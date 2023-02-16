import Editor from '@/components/Editor';
import { Button, Form, Input, message, Spin, Descriptions } from 'antd';
import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { uploadCode, runCode, checkResult, checkStatus, stopTask } from '@/services/user';
import HeaderBar from '@/components/HeaderBar';
import { CodeType } from '@/const/typings';

import './index.less';

interface BatchTaskConfig {
  name: string;
  totalRounds: number;
  timeout: number;
}

interface CodeInfo {
  codeId?: number;
  type: CodeType;
  content: string;
}

const BatchTasks: React.FC = () => {
  const editorRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(true);

  const [codeAHoney, setCodeAHoney] = useState<CodeInfo>({ type: 'honey-A' } as CodeInfo);
  const [codeAHornet, setCodeAHornet] = useState<CodeInfo>({ type: 'hornet-A' } as CodeInfo);
  const [codeBHoney, setCodeBHoney] = useState<CodeInfo>({ type: 'honey-B' } as CodeInfo);
  const [codeBHornet, setCodeBHornet] = useState<CodeInfo>({ type: 'hornet-B' } as CodeInfo);

  const findCodeInfoByType = (type: CodeType) => {
    switch (type) {
      case 'honey-A':
        return {
          codeInfo: codeAHoney,
          setCodeInfo: setCodeAHoney,
        };
      case 'honey-B':
        return {
          codeInfo: codeBHoney,
          setCodeInfo: setCodeBHoney,
        };
      case 'hornet-A':
        return {
          codeInfo: codeAHornet,
          setCodeInfo: setCodeAHornet,
        };
      case 'hornet-B':
        return {
          codeInfo: codeBHornet,
          setCodeInfo: setCodeBHornet,
        };
    }
  };

  const [batchTaskId, setBatchTaskId] = useState<number>(0);

  const [upperGoals, setUpperGoals] = useState<string>('');
  const [lowerGoals, setLowerGoals] = useState<string>('');
  const result = [upperGoals, lowerGoals];

  const handleUpload = async (type: CodeType) => {
    try {
      // setCode({...code, content: editorRef.current?.getContent(type)});
      // @ts-ignore
      const content = editorRef.current?.getContent(type);
      if (content === '') {
        message.error('请先输入代码！');
        return;
      }
      const { codeInfo, setCodeInfo } = findCodeInfoByType(type);
      const codeId = codeInfo?.codeId || undefined;
      const { codeId: newId } = await uploadCode({ type, codeId, content });
      setCodeInfo({ type, codeId: newId, content });
      message.success('上传成功！');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoading = async () => {
    try {
      const res = await checkStatus({ batchTaskId });
      console.log(res);
      if (res.status === 2 || res.status === 3) {
        return false;
      } else return true;
    } catch (e) {
      console.log(e);
    }
  };

  const handleRun = async (values: BatchTaskConfig) => {
    const { name, timeout = 1, totalRounds = 5 } = values;
    try {
      if (
        !codeAHoney?.codeId ||
        !codeAHornet?.codeId ||
        !codeBHoney?.codeId ||
        !codeBHornet?.codeId
      ) {
        message.error('请先上传代码！');
        return;
      } else {
        const runCodeParams = {
          codeIdAHoney: codeAHoney?.codeId,
          codeIdAHornet: codeAHornet?.codeId,
          codeIdBHoney: codeBHoney?.codeId,
          codeIdBHornet: codeBHornet?.codeId,
          name,
          totalRounds,
          timeout,
        };
        const res = await runCode(runCodeParams);
        setBatchTaskId(res.id);

        setOpen(true);
        const interval = setInterval(async () => {
          const isProcessing = await handleLoading();
          if (!isProcessing) {
            clearInterval(interval);
            setOpen(false);
            handleCheck();
            setClose(false);
          }
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = async () => {
    try {
      await stopTask({ batchTaskId });
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheck = async () => {
    try {
      const res = await checkResult({ batchTaskId });
      console.log(res);
      setUpperGoals(res.upperGoals);
      setLowerGoals(res.lowerGoals);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bt">
      <Modal
        isOpen={open}
        overlayClassName="overlay"
        className="content"
        ariaHideApp={false}
      >
        <div className="bg">
          <div className="box">
            <Spin tip="Loading"></Spin>
            <Button
              onClick={() => handleCancel()}
              className="cancel"
            >
              取消运行
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={!close}
        overlayClassName="overlay"
        className="content"
        ariaHideApp={false}
      >
        <div className="bg">
          <div className="box">
            <Descriptions
              title="运行结果"
              bordered
              column={1}
            >
              <Descriptions.Item label="上半场">{upperGoals}</Descriptions.Item>
              <Descriptions.Item label="下半场">{lowerGoals}</Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={() => setClose(true)}
            >
              关闭窗口
            </Button>
          </div>
        </div>
      </Modal>
      <div className="bt-top">
        <HeaderBar />
        {/* <Button className="check" onClick={() => { handleCheck() }}>查看结果</Button> */}
      </div>
      <div className="bt-editor">
        <div className="honeyA">
          {/* <div className='codeType' style={{height:'6%', backgroundColor:'white'}}>蜜蜂A</div> */}
          <Button
            className="upload"
            onClick={() => handleUpload('honey-A')}
          >
            上传
          </Button>
          <Editor ref={editorRef} />
        </div>
        <div className="hornetA">
          {/* <div className='codeType' style={{height:'6%', backgroundColor:'white'}}>黄蜂A</div> */}
          <Button
            className="upload"
            onClick={() => handleUpload('hornet-A')}
          >
            上传
          </Button>
          <Editor ref={editorRef} />
        </div>
        <div className="settings">
          <div className="st-header">参数设置</div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleRun}
            autoComplete="off"
          >
            <Form.Item
              label="任务名称"
              name="name"
              rules={[{ required: true, message: '请输入任务名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="运行总轮数"
              name="totalRounds"
              rules={[{ required: true, message: '请输入运行总轮数' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="超时时间"
              name="timeout"
              rules={[{ required: true, message: '请输入超时时间' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                className="run"
                type="primary"
                htmlType="submit"
              >
                运行
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="honeyB">
          {/* <div className='codeType' style={{height:'6%', backgroundColor:'white'}}>蜜蜂B</div> */}
          <Button
            className="upload"
            onClick={() => handleUpload('honey-B')}
          >
            上传
          </Button>
          <Editor ref={editorRef} />
        </div>
        <div className="hornetB">
          {/* <div className='codeType' style={{height:'6%', backgroundColor:'white'}}>黄蜂B</div> */}
          <Button
            className="upload"
            onClick={() => handleUpload('hornet-B')}
          >
            上传
          </Button>
          <Editor ref={editorRef} />
        </div>
      </div>
    </div>
  );
};

export default BatchTasks;
