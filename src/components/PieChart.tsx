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
  const now = new Date();
  let timestampThreshold: number;
  switch(data.scale) {
    case 'Day':
      timestampThreshold = new Date(now.setDate(now.getDate() - 1)).getTime();
      break;
    case 'Week':
      timestampThreshold = new Date(now.setDate(now.getDate() - 7)).getTime();
      break;
    case 'Month':
      timestampThreshold = new Date(now.setMonth(now.getMonth() - 1)).getTime();
      break;
    case 'Year':
      timestampThreshold = new Date(now.setFullYear(now.getFullYear() - 1)).getTime();
      break;
  }

  const dataGroupedByCategory: GarbageHistory = { garbage: [] };
  data.data.garbage.forEach(garbage => {
    const existingGarbage = dataGroupedByCategory.garbage.find(item => item.category === garbage.category);
    if (existingGarbage) {
      existingGarbage.values = existingGarbage.values.concat(garbage.values.filter(item => new Date(item.date).getTime() >= timestampThreshold));
      return;
    }

    dataGroupedByCategory.garbage.push({
      name: garbage.name,
      category: garbage.category,
      values: garbage.values.filter(item => new Date(item.date).getTime() >= timestampThreshold),
    });
  });

  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const chart = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: dataGroupedByCategory.garbage.map(item => item.category),
          datasets: [{
            data: dataGroupedByCategory.garbage.map(item => {
              return item.values.map(item => item.amount).reduce((total,x) => (total+x), 0);
            }),
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
