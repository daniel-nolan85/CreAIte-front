import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '../requests/admin';
import Navbar from '../components/Navbar';
import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import Messages from '../components/admin/Messages';
import Users from '../components/admin/Users';
import CreAItions from '../components/admin/CreAItions';
import Payments from '../components/admin/Payments';

const Admin = () => {
  const [activeNavItem, setActiveNavItem] = useState('showDashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [numUsers, setNumUsers] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const [numCreAItions, setNumCreAItions] = useState(0);
  const [creAItionsData, setCreAItionsData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [paymentData, setPaymentData] = useState([]);

  const { token } = useSelector((state) => state.user) || {};

  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);

  useEffect(() => {
    let income = 0;

    for (const year in paymentData) {
      for (const month in paymentData[year]) {
        paymentData[year][month].forEach((payment) => {
          income += payment.amount;
        });
      }
    }
    const formattedTotalIncome = income.toLocaleString();
    setTotalIncome(formattedTotalIncome);
  }, [paymentData]);

  const getData = async () => {
    await fetchData(token)
      .then((res) => {
        setNumUsers(res.data.users);
        setNumCreAItions(res.data.creations);
        setUsersData(res.data.usersByMonth);
        setCreAItionsData(res.data.creationsByMonth);
        setPaymentData(res.data.paymentData);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(setIsLoading(false));
  };

  return (
    <>
      <main className='w-full h-screen'>
        <Navbar />
        <div className='flex justify-between items-start bg-[#000300]'>
          <Sidebar
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
          />
          {activeNavItem === 'showDashboard' && (
            <Dashboard
              isLoading={isLoading}
              numUsers={numUsers}
              usersData={usersData}
              numCreAItions={numCreAItions}
              creAItionsData={creAItionsData}
              totalIncome={totalIncome}
              paymentData={paymentData}
            />
          )}
          {activeNavItem === 'showMessages' && <Messages />}
          {activeNavItem === 'showUsers' && <Users />}
          {activeNavItem === 'showCreAItions' && <CreAItions />}
          {activeNavItem === 'showPayments' && (
            <Payments paymentData={paymentData} />
          )}
        </div>
      </main>
    </>
  );
};

export default Admin;
