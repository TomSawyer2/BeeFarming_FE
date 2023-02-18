import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { PieChart as EPieChart, PieSeriesOption } from 'echarts/charts';
import { TitleComponent } from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useRef, useState } from 'react';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  EPieChart,
  CanvasRenderer,
  LabelLayout,
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

interface PieChartProps {
  name: string;
  data: Array<Record<string, unknown>>;
}

const PieChart = (props: PieChartProps) => {
  const { name, data } = props;

  const chartRef = useRef<HTMLInputElement>(null);
  const [chart, setChart] = useState<echarts.ECharts>();

  const option: EChartsOption = {
    title: {
      text: name,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name,
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          fontSize: 16,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
          smooth: true,
        },
        data,
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

export default PieChart;
