import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { LineChart as ELineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ELineChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;

interface LineChartProps {
  dataA: Array<number>;
  dataB: Array<number>;
}

const LineChart = (props: LineChartProps) => {
  const { dataA, dataB } = props;
  const chartRef = useRef<HTMLInputElement>(null);
  const [chart, setChart] = useState<echarts.ECharts>();

  // 生成一个从1到dataA长度的数组
  const xAxisData = Array.from(Array(dataA.length).keys()).map((item) => item + 1);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['A', 'B'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '玩家A',
        type: 'line',
        stack: 'Total',
        data: dataA,
      },
      {
        name: '玩家B',
        type: 'line',
        stack: 'Total',
        data: dataB,
      },
    ],
  };

  const handleResize = () => {
    chart?.resize();
  };

  const initChart = () => {
    if (chart) {
      window.removeEventListener('resize', handleResize);
      chart?.dispose();
    }

    const newChart = echarts?.init(chartRef?.current as HTMLElement);
    newChart.setOption(option, true);
    window.addEventListener('resize', handleResize);
    setChart(newChart);
  };

  useEffect(() => {
    initChart();
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ height: '450px', width: '500px' }}
    />
  );
};

export default LineChart;
