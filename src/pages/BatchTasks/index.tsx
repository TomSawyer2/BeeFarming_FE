import Editor from '@/components/Editor';
import { Button, Form, Input, message, Spin } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { uploadCode, runCode, checkResult, checkStatus, stopTask } from '@/services/user';
import { BatchTaskStatus, CodeType, UserStatus } from '@/const/typings';
import { Modal } from 'antd';
import ResultChart from '@/components/ResultChart';
import { createPortal } from 'react-dom';

import './index.less';
import { userInfoContext, UserInfoContextProps } from '@/const/context';

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

  const [codeAHoney, setCodeAHoney] = useState<CodeInfo>({ type: 'honey-A' } as CodeInfo);
  const [codeAHornet, setCodeAHornet] = useState<CodeInfo>({ type: 'hornet-A' } as CodeInfo);
  const [codeBHoney, setCodeBHoney] = useState<CodeInfo>({ type: 'honey-B' } as CodeInfo);
  const [codeBHornet, setCodeBHornet] = useState<CodeInfo>({ type: 'hornet-B' } as CodeInfo);

  const { userInfo, setUserInfo } = useContext<UserInfoContextProps>(userInfoContext);

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

  const handleUpload = async (type: CodeType) => {
    try {
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

  const handleLoading = async (taskId: number) => {
    try {
      const res = await checkStatus({ batchTaskId: taskId });
      if (res.status === BatchTaskStatus.Finished || res.status === BatchTaskStatus.Failed) {
        return false;
      } else return true;
    } catch (e) {
      console.error(e);
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
        const taskId = res.id;

        setOpen(true);
        const interval = setInterval(async () => {
          const isProcessing = await handleLoading(taskId);
          if (!isProcessing) {
            clearInterval(interval);
            setOpen(false);
            await handleCheck(taskId);
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

  const handleCheck = async (taskId: number) => {
    try {
      const res = await checkResult({ batchTaskId: taskId });
      handleOpenResultChart(res.upperGoals, res.lowerGoals);
      setUserInfo({ ...userInfo, batchTaskId: null, status: UserStatus.Normal });
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenResultChart = (upperGoals: string, lowerGoals: string) => {
    if (!upperGoals || !lowerGoals) return;
    Modal.confirm({
      content: (
        <ResultChart
          upperGoals={upperGoals}
          lowerGoals={lowerGoals}
        />
      ),
      width: 1000 + 48,
      icon: null,
      footer: null,
      maskClosable: true,
    });
  };

  useEffect(() => {
    if (userInfo.status === UserStatus.Running && userInfo.batchTaskId !== null) {
      const taskId = userInfo.batchTaskId!;
      setBatchTaskId(taskId);
      setOpen(true);
      const interval = setInterval(async () => {
        const isProcessing = await handleLoading(taskId);
        if (!isProcessing) {
          clearInterval(interval);
          setOpen(false);
          await handleCheck(taskId);
        }
      }, 1000);
    }
  }, []);

  return (
    <div className="bt">
      {open &&
        createPortal(
          <div className="fs-mask">
            <div className="fs-mask-box">
              <Spin tip="Loading"></Spin>
              <Button
                onClick={() => handleCancel()}
                className="cancel"
              >
                取消运行
              </Button>
            </div>
          </div>,
          document.getElementById('root') as HTMLElement,
        )}

      <div className="bt-editor">
        <div className="bt-editor-left">
          <div className="honeyA">
            <Button
              className="upload"
              onClick={() => handleUpload('honey-A')}
            >
              上传
            </Button>
            <Editor ref={editorRef} />
          </div>
          <div className="tooltip">
            <span>玩家A蜜蜂代码↑</span>
            <span>玩家A黄蜂代码↓</span>
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
        </div>

        <div className="settings">
          <div className="st-header">参数设置</div>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true, timeout: 1, totalRounds: 5, name: '一次新的任务' }}
            onFinish={handleRun}
            autoComplete="off"
            className="batchTask-form"
          >
            <Form.Item
              label="任务名称"
              name="name"
              rules={[{ required: true, message: '请输入任务名称' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="运行轮数"
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

            <Form.Item
              wrapperCol={{ offset: 8, span: 16 }}
              noStyle
            >
              <Button
                className="runBtn"
                type="primary"
                htmlType="submit"
              >
                运行
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bt-editor-right">
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
          <div className="tooltip">
            <span>玩家B蜜蜂代码↑</span>
            <span>玩家B黄蜂代码↓</span>
          </div>
          <div className="hornetB">
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
    </div>
  );
};

export default BatchTasks;
