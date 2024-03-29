import React from 'react';
import PieChart from '../PieChart';
import LineChart from '../LineChart';
import { Tabs, TabsProps } from 'antd';

import styles from './index.less';

interface IProps {
  upperGoals: string;
  lowerGoals: string;
  confidenceLevel: number;
}

const ResultChart = (props: IProps) => {
  const { upperGoals, lowerGoals, confidenceLevel = 0 } = props;
  const upperGoalsArr = upperGoals.split(',');
  const lowerGoalsArr = lowerGoals.split(',');
  const upperTotalHoneyArr = upperGoalsArr.map((item) => {
    const itemArr = item.split(' ');
    return Number(itemArr[0]);
  });
  const upperAliveBees = upperGoalsArr.map((item) => {
    const itemArr = item.split(' ');
    return Number(itemArr[1]);
  });
  const upperTimeLeft = upperGoalsArr.map((item) => {
    const itemArr = item.split(' ');
    return Number(itemArr[2]);
  });
  const upperFinalGoals = upperGoalsArr.map((item) => {
    const itemArr = item.split(' ');
    return Number(itemArr[3]);
  });

  const lowerTotalHoneyArr = lowerGoalsArr.map((item) => {
    const itemArr = item.split(' ');
    return Number(itemArr[0]);
  });
  const lowerAliveBees = lowerGoalsArr.map((item) => {
    const itemArr = item.split(' ');
    return Number(itemArr[1]);
  });
  const lowerTimeLeft = lowerGoalsArr.map((item) => {
    const itemArr = item.split(' ');
    return Number(itemArr[2]);
  });
  const lowerFinalGoals = lowerGoalsArr.map((item) => {
    const itemArr = item.split(' ');
    return Number(itemArr[3]);
  });
  // A赢的次数
  const winnersA = upperFinalGoals.reduce((prev, current, index) => {
    if (current > lowerFinalGoals[index]) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);
  // B赢的次数
  const winnersB = lowerFinalGoals.reduce((prev, current, index) => {
    if (current > upperFinalGoals[index]) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);
  // 计算平局数
  const draw = upperFinalGoals.length - winnersA - winnersB;
  const pieChartData = [
    {
      name: '玩家A',
      value: winnersA,
    },
    {
      name: '玩家B',
      value: winnersB,
    },
  ];

  if (draw !== 0) pieChartData.push({ name: '平局', value: draw });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `总蜂蜜`,
      children: (
        <LineChart
          dataA={upperTotalHoneyArr}
          dataB={lowerTotalHoneyArr}
        />
      ),
    },
    {
      key: '2',
      label: `存活蜜蜂数`,
      children: (
        <LineChart
          dataA={upperAliveBees}
          dataB={lowerAliveBees}
        />
      ),
    },
    {
      key: '3',
      label: `剩余时间`,
      children: (
        <LineChart
          dataA={upperTimeLeft}
          dataB={lowerTimeLeft}
        />
      ),
    },
  ];

  // 计算胜率
  const totalLen = upperFinalGoals.length - draw;
  const winRateA = `${((winnersA / totalLen) * 100).toFixed(2)}%`;
  const winRateB = `${((winnersB / totalLen) * 100).toFixed(2)}%`;

  const getConfidenceLevelText = (val: number) => {
    if (val === 0) {
      return <span className={styles.result_text}>双方旗鼓相当，无法计算置信度</span>;
    } else if (val > 0) {
      return (
        <span className={styles.result_text}>
          置信度：
          <span style={{ color: 'green' }}>{confidenceLevel.toFixed(2)}%</span>
        </span>
      );
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.box_left}>
        <PieChart
          name="比赛总结果"
          data={pieChartData}
        />
        {draw !== upperFinalGoals.length && winnersA !== winnersB ? (
          <>
            <span className={styles.result_text}>
              <span className={styles.result_text_name}>玩家{winnersA > winnersB ? 'A' : 'B'}</span>
              以{winnersA > winnersB ? winRateA : winRateB}胜率获得了胜利
            </span>
            {getConfidenceLevelText(confidenceLevel)}
          </>
        ) : (
          <>
            <span className={styles.result_text}>双方平局</span>
            {getConfidenceLevelText(confidenceLevel)}
          </>
        )}
      </div>
      <div className={styles.box_right}>
        <Tabs
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
};

export default ResultChart;
