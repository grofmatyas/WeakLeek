import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { GarbageHistory, TimeScale } from '../data/types';

interface PieChartProps {
  data: {
    data: GarbageHistory;
    scale: TimeScale;
  };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const formatGarbageHistoryToPieChartFormat = (data: GarbageHistory, _scale: TimeScale): {
    labels: string[];
    values: number[];
    colors?: string[];
    } => {
    const response: {
      labels: string[];
      values: number[];
      colors?: string[];
      } = {
      labels: [],
      values: [],
    }

    const dataGroupedByCategory: GarbageHistory = { garbage: [] };
    data.garbage.forEach(garbage => {
      const existingGarbage = dataGroupedByCategory.garbage.find(item => item.category === garbage.category);
      if (existingGarbage) {
        existingGarbage.values = existingGarbage.values.concat(garbage.values);
        return;
      }

      dataGroupedByCategory.garbage.push(garbage);
    });

    return {
      labels: dataGroupedByCategory.garbage.map(item => item.category),
      values: dataGroupedByCategory.garbage.map(item => {
        return item.values.map(item => item.amount).reduce((total,x) => (total+x), 0);
      }),
    };
  };

  const chartRef = useRef<HTMLCanvasElement>(null);
  const formattedData = formatGarbageHistoryToPieChartFormat(data.data, data.scale);

  useEffect(() => {
    if (chartRef.current && data) {
      const chart = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: formattedData.labels,
          datasets: [{
            data: formattedData.values,
          }],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
