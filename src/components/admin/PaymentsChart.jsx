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

const PaymentsChart = ({ paymentData }) => {
  const getPaymentDataForYear = (year) => {
    const totalAmounts = Array(12).fill(0);
    for (let i = 0; i < 12; i++) {
      const monthName = new Date(year, i).toLocaleString('default', {
        month: 'long',
      });
      if (paymentData[year] && paymentData[year][monthName]) {
        paymentData[year][monthName].forEach((payment) => {
          totalAmounts[i] += payment.amount;
        });
      }
    }
    return totalAmounts;
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
        label: 'Income',
        data: getPaymentDataForYear(2024),
        backgroundColor: '#C9A0DC',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default PaymentsChart;
