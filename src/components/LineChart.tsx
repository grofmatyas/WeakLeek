import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { GarbageHistory, TimeScale } from '../data/types';

interface LineChartProps {
  data: {
    data: GarbageHistory;
    scale: TimeScale;
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const now = new Date();
    const nowCopy = new Date(now);
    let timestampThreshold: number;
  
    const chartRef = useRef<HTMLCanvasElement>(null);

    let labels: any[];
    let orientationDateMethodName: 'getHours' | 'getDay' | 'getDate' | 'getMonth';
    let max = 1;
    switch(data.scale) {
        case 'Day':
            orientationDateMethodName = 'getHours';
            timestampThreshold = new Date(nowCopy.setDate(nowCopy.getDate() - 1)).getTime();
            const preLabels1 = Array.from(Array(24).keys());
            labels = preLabels1.splice(0, now[orientationDateMethodName]() + 1)
            labels = preLabels1.concat(labels);
            max = 24;
            break;
        case 'Week':
            orientationDateMethodName = 'getDay';
            timestampThreshold = new Date(nowCopy.setDate(nowCopy.getDate() - 7)).getTime();
            const preLabels2 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            labels = preLabels2.splice(0, now[orientationDateMethodName]())
            labels = preLabels2.concat(labels);
            max = 7;
            break;
        case 'Month':
            orientationDateMethodName = 'getDate';
            timestampThreshold = new Date(nowCopy.setMonth(nowCopy.getMonth() - 1)).getTime();
            const preLabels3 = Array.from(Array(new Date(now.getFullYear(), now.getMonth(), 0).getDate()).keys());
            labels = preLabels3.splice(0, now[orientationDateMethodName]() + 1);
            labels = preLabels3.concat(labels);
            max = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            break;
        case 'Year':
            orientationDateMethodName = 'getMonth';
            timestampThreshold = new Date(nowCopy.setFullYear(nowCopy.getFullYear() - 1)).getTime();
            const preLabels4 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            labels = preLabels4.splice(0, now[orientationDateMethodName]() + 1)
            labels = preLabels4.concat(labels);
            max = 12;
            break;
      }

    const dataGroupedByCategory: GarbageHistory = { garbage: [] };
    data.data.garbage.forEach(garbage => {
        const existingGarbage = dataGroupedByCategory.garbage.find(item => item.category === garbage.category);
        if (existingGarbage) {
            existingGarbage.values = existingGarbage.values.concat(garbage.values.filter(item => item.date.getTime() >= timestampThreshold));
            return;
        }

        dataGroupedByCategory.garbage.push({
            name: garbage.name,
            category: garbage.category,
            values: garbage.values.filter(item => item.date.getTime() >= timestampThreshold),
        });
    });
  
    useEffect(() => {
        if (chartRef.current && data) {
        const chart = new Chart(chartRef.current, {
            type: 'line',
            data: {
            labels,
            datasets: dataGroupedByCategory.garbage.map(item => {
                return {
                    label: item.category,
                    data: item.values.reduce((total, current) => {
                        let index = + current.date[orientationDateMethodName]() - now[orientationDateMethodName]() - 1;
                        if (index < 0) {
                            index += max;
                        }
                        total[index] = total[index] + current.amount;
                        return total;
                    }, new Array(labels.length).fill(0)),
                };
            }),
            },
        });

        return () => {
            chart.destroy();
        };
        }
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default LineChart;
