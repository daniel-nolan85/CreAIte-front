import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CreAItionsChart = ({ creAItionsData }) => {
  const getCreAItionDataForYear = () => {
    const creAItionCounts = Array(12).fill(0);
    creAItionsData.forEach(({ _id, count }) => {
      if (_id.year === 2024) {
        const monthIndex = _id.month - 1;
        creAItionCounts[monthIndex] = count;
      }
    });
    return creAItionCounts;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${new Date().getFullYear()}`,
      },
    },
  };

  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'CreAItions',
        data: getCreAItionDataForYear(),
        backgroundColor: '#FFC0CB',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default CreAItionsChart;
