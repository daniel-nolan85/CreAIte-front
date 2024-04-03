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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = [
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
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Users',
      data: [1000, 3000, 5000, 7000, 9000, 6000, 4000],
      backgroundColor: '#A4D8E9',
    },
    {
      label: 'CreAItions',
      data: [3000, 4000, 5000, 1000, 3000, 6000, 9000],
      backgroundColor: '#FFC0CB',
    },
    {
      label: 'Income',
      data: [3000, 4000, 5000, 1000, 3000, 6000, 9000],
      backgroundColor: '#C9A0DC',
    },
  ],
};

const Chart = () => {
  return <Bar options={options} data={data} />;
};

export default Chart;
