import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import { getHistory } from '@/services/user';

import './index.less';
import EllipseModal from '@/components/EllipseModal';
import dayjs from 'dayjs';
import { BatchTask, BatchTaskStatus } from '@/const/typings';
import { ColumnsType } from 'antd/es/table';
import ResultChart from '@/components/ResultChart';

const History: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<BatchTask[]>([]);

  const columns: ColumnsType<BatchTask> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name }) => (
        <EllipseModal
          content={name}
          maxLength={4}
        />
      ),
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => {
        switch (status) {
          case BatchTaskStatus.Failed:
            return '失败';
          case BatchTaskStatus.Finished:
            return '完成';
          case BatchTaskStatus.Running:
            return '运行中';
          case BatchTaskStatus.Timeout:
            return '超时';
          case BatchTaskStatus.Waiting:
          default:
            return '未知';
        }
      },
    },
    {
      title: '容器id',
      dataIndex: 'containerId',
      key: 'containerId',
      render: (_, { containerId }) => (
        <EllipseModal
          content={containerId}
          maxLength={5}
        />
      ),
    },
    {
      title: 'A蜜蜂id',
      dataIndex: 'codeIdAHoney',
      key: 'codeIdAHoney',
    },
    {
      title: 'A黄蜂id',
      dataIndex: 'codeIdAHornet',
      key: 'codeIdAHornet',
    },
    {
      title: 'B蜜蜂id',
      dataIndex: 'codeIdBHoney',
      key: 'codeIdBHoney',
    },
    {
      title: 'B黄蜂id',
      dataIndex: 'codeIdBHornet',
      key: 'codeIdBHornet',
    },
    {
      title: '上半场结果',
      dataIndex: 'upperGoals',
      key: 'upperGoals',
      render: (_, { upperGoals }) => (
        <EllipseModal
          content={upperGoals}
          maxLength={6}
        />
      ),
    },
    {
      title: '下半场结果',
      dataIndex: 'lowerGoals',
      key: 'lowerGoals',
      render: (_, { lowerGoals }) => (
        <EllipseModal
          content={lowerGoals}
          maxLength={6}
        />
      ),
    },
    {
      title: '总轮数',
      dataIndex: 'totalRounds',
      key: 'totalRounds',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (_, { startTime }) => (startTime ? dayjs(startTime).format('MM-DD HH:mm') : '--'),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (_, { endTime }) => (endTime ? dayjs(endTime).format('MM-DD HH:mm') : '--'),
    },
    {
      title: '超时时间',
      dataIndex: 'timeout',
      key: 'timeout',
    },
    {
      title: '容器日志',
      dataIndex: 'containerLog',
      key: 'containerLog',
      render: (_, { containerLog }) => (
        <EllipseModal
          content={containerLog}
          maxLength={4}
        />
      ),
    },
    {
      title: '结果分析',
      dataIndex: 'resultAnalysis',
      key: 'resultAnalysis',
      render: (_, { upperGoals, lowerGoals, confidenceLevel }) => {
        const handleOpenResultChart = (
          upperGoals: string,
          lowerGoals: string,
          confidenceLevel: number,
        ) => {
          if (!upperGoals || !lowerGoals) return;
          Modal.confirm({
            content: (
              <ResultChart
                upperGoals={upperGoals}
                lowerGoals={lowerGoals}
                confidenceLevel={confidenceLevel}
              />
            ),
            getContainer() {
              return document.getElementById('root') as HTMLElement;
            },
            width: 1000 + 48,
            icon: null,
            footer: null,
            centered: true,
            maskClosable: true,
          });
        };
        return upperGoals && lowerGoals ? (
          <Button onClick={() => handleOpenResultChart(upperGoals, lowerGoals, confidenceLevel)}>
            结果分析
          </Button>
        ) : (
          '--'
        );
      },
    },
  ];

  const fetchTaskList = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    const res = await getHistory({ page, pageSize });
    const { total, batchTasks } = res;
    setPage(page);
    setPageSize(pageSize);
    setTotal(total);
    setTaskList(batchTasks);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTaskList(page, pageSize);
  }, []);

  return (
    <div className="history">
      <div className="history-wrapper">
        <Table
          loading={loading}
          columns={columns}
          dataSource={taskList}
          pagination={{
            hideOnSinglePage: true,
            pageSize,
            current: page,
            total,
            onChange(page, pageSize) {
              fetchTaskList(page, pageSize);
            },
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </div>
    </div>
  );
};

export default History;
