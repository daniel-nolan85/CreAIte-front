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

const UsersChart = ({ usersData }) => {
  const getUserDataForYear = () => {
    const userCounts = Array(12).fill(0);
    usersData.forEach(({ _id, count }) => {
      if (_id.year === 2024) {
        const monthIndex = _id.month - 1;
        userCounts[monthIndex] = count;
      }
    });
    return userCounts;
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
        label: 'Users',
        data: getUserDataForYear(),
        backgroundColor: '#A4D8E9',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default UsersChart;
