import Editor from '@/components/Editor';
import { Button, Form, Input, message, Spin, Progress } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { uploadCode, runCode, checkResult, checkStatus, stopTask } from '@/services/user';
import { BatchTaskStatus, CodeType, UserStatus } from '@/const/typings';
import { Modal } from 'antd';
import ResultChart from '@/components/ResultChart';
import { createPortal } from 'react-dom';
import { debounce } from 'lodash';

import './index.less';
import { userInfoContext, UserInfoContextProps } from '@/const/context';
import LoadingIcon from '@/components/LoadingIcon';

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

  const [totalRounds, setTotalRounds] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(0);

  const [codeAHoney, setCodeAHoney] = useState<CodeInfo>({ type: 'honey-A' } as CodeInfo);
  const [codeAHornet, setCodeAHornet] = useState<CodeInfo>({ type: 'hornet-A' } as CodeInfo);
  const [codeBHoney, setCodeBHoney] = useState<CodeInfo>({ type: 'honey-B' } as CodeInfo);
  const [codeBHornet, setCodeBHornet] = useState<CodeInfo>({ type: 'hornet-B' } as CodeInfo);
  // 创建上面state的ref
  const codeAHoneyRef = useRef(codeAHoney);
  const codeAHornetRef = useRef(codeAHornet);
  const codeBHoneyRef = useRef(codeBHoney);
  const codeBHornetRef = useRef(codeBHornet);

  const refMap = {
    'honey-A': codeAHoneyRef,
    'honey-B': codeBHoneyRef,
    'hornet-A': codeAHornetRef,
    'hornet-B': codeBHornetRef,
  };

  const [codeAHoneyLoading, setCodeAHoneyLoading] = useState<boolean>(false);
  const [codeAHornetLoading, setCodeAHornetLoading] = useState<boolean>(false);
  const [codeBHoneyLoading, setCodeBHoneyLoading] = useState<boolean>(false);
  const [codeBHornetLoading, setCodeBHornetLoading] = useState<boolean>(false);

  const { userInfo, setUserInfo } = useContext<UserInfoContextProps>(userInfoContext);

  const findCodeInfoByType = (type: CodeType) => {
    switch (type) {
      case 'honey-A':
        return {
          codeInfo: codeAHoneyRef.current,
          setCodeInfo: setCodeAHoney,
        };
      case 'honey-B':
        return {
          codeInfo: codeBHoneyRef.current,
          setCodeInfo: setCodeBHoney,
        };
      case 'hornet-A':
        return {
          codeInfo: codeAHornetRef.current,
          setCodeInfo: setCodeAHornet,
        };
      case 'hornet-B':
        return {
          codeInfo: codeBHornetRef.current,
          setCodeInfo: setCodeBHornet,
        };
    }
  };

  const findLoadingByType = (type: CodeType) => {
    switch (type) {
      case 'honey-A':
        return {
          loading: codeAHoneyLoading,
          setLoading: setCodeAHoneyLoading,
        };
      case 'honey-B':
        return {
          loading: codeBHoneyLoading,
          setLoading: setCodeBHoneyLoading,
        };
      case 'hornet-A':
        return {
          loading: codeAHornetLoading,
          setLoading: setCodeAHornetLoading,
        };
      case 'hornet-B':
        return {
          loading: codeBHornetLoading,
          setLoading: setCodeBHornetLoading,
        };
    }
  };

  const [batchTaskId, setBatchTaskId] = useState<number>(0);

  const handleUpload = async (type: CodeType) => {
    try {
      // @ts-ignore
      const content = editorRef.current?.getContent(type);
      const { codeInfo, setCodeInfo } = findCodeInfoByType(type);
      const codeId = codeInfo?.codeId || undefined;
      const { codeId: newId } = await uploadCode({ type, codeId, content });
      setCodeInfo({ type, codeId: newId, content });
      refMap[type].current = { type, codeId: newId, content };
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoading = async (taskId: number) => {
    try {
      const res = await checkStatus({ batchTaskId: taskId });
      const { currentRound, totalRounds } = res;
      setCurrentRound(currentRound);
      setTotalRounds(totalRounds);
      if (
        res.status === BatchTaskStatus.Finished ||
        res.status === BatchTaskStatus.Failed ||
        res.status === BatchTaskStatus.Timeout
      ) {
        return false;
      } else return true;
    } catch (e) {
      console.error(e);
    }
  };

  const handleRun = async (values: BatchTaskConfig) => {
    const { name, timeout = 1, totalRounds = 5 } = values;
    setTotalRounds(totalRounds);
    try {
      if (
        !codeAHoney?.codeId ||
        !codeAHornet?.codeId ||
        !codeBHoney?.codeId ||
        !codeBHornet?.codeId
      ) {
        message.error('请先上传代码！');
        return;
      } else if (
        codeAHoneyLoading ||
        codeAHornetLoading ||
        codeBHoneyLoading ||
        codeBHornetLoading
      ) {
        message.error('代码正在上传中，请稍后再试！');
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
        setCurrentRound(0);
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
      if (res.status === BatchTaskStatus.Failed && res?.containerLog) {
        handleResultErrorOpen(res?.containerLog || '');
      } else if (res.status === BatchTaskStatus.Finished) {
        handleOpenResultChart(res.upperGoals, res.lowerGoals);
      } else if (res.status === BatchTaskStatus.Timeout) {
        message.error('任务超时');
      } else {
        message.error('发生未知错误');
      }
      setUserInfo({ ...userInfo, batchTaskId: null, status: UserStatus.Normal });
    } catch (e) {
      console.error(e);
    }
  };

  const handleResultErrorOpen = (log: string) => {
    Modal.confirm({
      icon: null,
      title: '错误日志',
      centered: true,
      content: (
        <div style={{ maxHeight: 400, overflow: 'auto' }}>
          <span>以下内容为容器输出报错日志</span>
          <pre>{log}</pre>
        </div>
      ),
    });
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

  // 防抖200ms
  const handleEditorChange = debounce(async (type: CodeType) => {
    const { setLoading } = findLoadingByType(type);
    setLoading(true);
    await handleUpload(type);
    setLoading(false);
  }, 200);

  return (
    <div className="bt">
      {open &&
        createPortal(
          <div className="fs-mask">
            <div className="fs-mask-box">
              <Spin
                tip="Loading"
                size="large"
              />
              <div className="loading-content">
                <Progress
                  percent={Number(((currentRound / 2 / totalRounds) * 100).toFixed(2))}
                  status="active"
                  strokeWidth={15}
                />
              </div>
              <div className="loading-content-stat">
                当前轮数：{Math.floor(currentRound / 2)} 总轮数：{totalRounds}
              </div>
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
            <Editor
              ref={editorRef}
              onChange={(type) => handleEditorChange(type)}
            />
          </div>
          <div className="tooltip">
            <span>
              玩家A蜜蜂代码↑ <LoadingIcon loading={findLoadingByType('honey-A').loading} />
            </span>
            <span>
              玩家A黄蜂代码↓ <LoadingIcon loading={findLoadingByType('hornet-A').loading} />
            </span>
          </div>
          <div className="hornetA">
            <Editor
              ref={editorRef}
              onChange={(type) => handleEditorChange(type)}
            />
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
            <Editor
              ref={editorRef}
              onChange={(type) => handleEditorChange(type)}
            />
          </div>
          <div className="tooltip">
            <span>
              玩家B蜜蜂代码↑ <LoadingIcon loading={findLoadingByType('honey-B').loading} />
            </span>
            <span>
              玩家B黄蜂代码↓ <LoadingIcon loading={findLoadingByType('hornet-B').loading} />
            </span>
          </div>
          <div className="hornetB">
            <Editor
              ref={editorRef}
              onChange={(type) => handleEditorChange(type)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchTasks;
