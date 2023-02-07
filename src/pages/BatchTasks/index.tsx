import Editor from '@/components/Editor';
import { Button, Form, Input, message, Spin, Descriptions, Tabs } from 'antd';
import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { uploadCode, runCode, checkResult, checkStatus, stopTask } from '@/services/user'

import './index.less';
import HeaderBar from '@/components/HeaderBar';

const BatchTasks: React.FC = () => {
  const editorRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(true);
  const [content, setContent] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [codeId, setCodeId] = useState<number>();
  const [code, setCode] = useState({
    content,
    type,
    codeId
  })

  const [codeIdAHoney, setCodeIdAHoney] = useState<number>(165);
  const [codeIdAHornet, setCodeIdAHornet] = useState<number>(166);
  const [codeIdBHoney, setCodeIdBHoney] = useState<number>(167);
  const [codeIdBHornet, setCodeIdBHornet] = useState<number>(168);
  const [name, setName] = useState<string>('');
  const [totalRounds, setTotalRounds] = useState<number>(2);
  const [timeout, setTimeout] = useState<number>(10000);
  const [run, setRun] = useState({
    codeIdAHoney,
    codeIdAHornet,
    codeIdBHoney,
    codeIdBHornet,
    name,
    totalRounds,
    timeout
  })

  const [batchTaskId, setBatchTaskId] = useState<number>();
  const [check, setCheck] = useState({
    batchTaskId
  })

  const [upperGoals, setUpperGoals] = useState<string>('');
  const [lowerGoals, setLowerGoals] = useState<string>('');
  const result = [
    upperGoals,
    lowerGoals
  ]

  const onFinish = (values: any) => {
    run.name = values.name;
    run.timeout = values.timeout;
    run.totalRounds = values.totalRounds;
    message.success('参数设置成功！')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleUpload = async (type: string) => {
    try {
      // setCode({...code, content: editorRef.current?.getContent(type)});
      code.content = editorRef.current?.getContent(type);
      if (code.content == '') {
        message.error('请先输入代码！')
      }
      else {
        code.type = type;
        const res = await uploadCode(code);
        switch (type) {
          case 'honey-A': run.codeIdAHoney = res.codeId;
          case 'hornet-A': run.codeIdAHornet = res.codeId;
          case 'honey-B': run.codeIdBHoney = res.codeId;
          case 'hornet-B': run.codeIdBHornet = res.codeId;
        }
        message.success('上传成功！')
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleLoading = async () => {
    try {
      const res = await checkStatus(check);
      console.log(res);
      if (res.status === 2 || res.status === 3) {
        return false;
      } else return true;
    } catch (e) {
      console.log(e);
    }
  }

  const handleRun = async () => {
    try {
      if (run.codeIdAHoney == undefined || run.codeIdAHornet == undefined || run.codeIdBHoney == undefined || run.codeIdBHornet == undefined) {
        message.error('请先上传代码！');
      }
      else if (run.timeout == undefined || run.totalRounds == undefined) {
        message.error('请先配置参数！');
      }
      else {
        const res = await runCode(run);
        // setCheck({...check, batchTaskId: res.id});
        check.batchTaskId = res.id;
        setOpen(true);
        const interval = setInterval(async function () {
          let a = await handleLoading();
          console.log(check.batchTaskId);
          if (a == false) {
            clearInterval(interval);
            setOpen(false);
            handleCheck();
            setClose(false);
          }
        }, 1000);
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  }
  const handleCancel = async () => {
    try {
      // const res = await stopTask(check);
      // console.log(res);
      setOpen(false);
    } catch (e) {

    }
  }
  const handleClose = async () => {
    try {
      // const res = await stopTask(check);
      // console.log(res);
      setClose(true);
    } catch (e) {

    }
  }
  const handleCheck = async () => {
    try {
      const res = await checkResult(check);
      console.log(res);
      setUpperGoals(res.upperGoals);
      setLowerGoals(res.lowerGoals);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="bt">
      <Modal
        isOpen={open}
        overlayClassName="overlay"
        className="content"
        ariaHideApp={false}
      >
        <div className='bg'>
          <div className='box'>
            <Spin tip="Loading"></Spin>
            <Button onClick={() => { handleCancel() }} className='cancel'>取消运行</Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={!close}
        overlayClassName="overlay"
        className="content"
        ariaHideApp={false}
      >
        <div className='bg'>
          <div className='box'>
            <Descriptions
              title="运行结果"
              bordered
              column={1}>
              <Descriptions.Item label="上半场">{upperGoals}</Descriptions.Item>
              <Descriptions.Item label="下半场">{lowerGoals}</Descriptions.Item>
            </Descriptions>,
            <Button type="primary" onClick={() => { handleClose() }}>
              关闭窗口
            </Button>,
            {/* <Button onClick={() => { handleClose() }} className='cancel'>关闭窗口</Button> */}
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
          <Button className="upload" onClick={() => { handleUpload('honey-A') }}>上传</Button>
          <Editor ref={editorRef} />
        </div>
        <div className="hornetA">
        {/* <div className='codeType' style={{height:'6%', backgroundColor:'white'}}>黄蜂A</div> */}
          <Button className="upload" onClick={() => { handleUpload('hornet-A') }}>上传</Button>
          <Editor ref={editorRef} />
        </div>
        <div className="settings">
          <div className='st-header'>参数设置</div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="任务名称"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="运行总轮数"
              name="totalRounds"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="超时时间"
              name="timeout"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                提交参数
              </Button>
              <Button className="run" type="primary" onClick={() => { handleRun() }}>运行</Button>
            </Form.Item>
          </Form>
        </div>
        <div className="honeyB">
        {/* <div className='codeType' style={{height:'6%', backgroundColor:'white'}}>蜜蜂B</div> */}
          <Button className="upload" onClick={() => { handleUpload('honey-B') }}>上传</Button>
          <Editor ref={editorRef} />
        </div>
        <div className="hornetB">
        {/* <div className='codeType' style={{height:'6%', backgroundColor:'white'}}>黄蜂B</div> */}
          <Button className="upload" onClick={() => { handleUpload('hornet-B') }}>上传</Button>
          <Editor ref={editorRef} />
        </div>
      </div>
    </div>
  );
};

export default BatchTasks;
