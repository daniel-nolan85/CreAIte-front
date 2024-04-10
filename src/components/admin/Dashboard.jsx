import { useState } from 'react';
import { FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { IoMdImages } from 'react-icons/io';
import Loader from '../Loader';
import UsersChart from './UsersChart';
import CreAItionsChart from './CreAItionsChart';
import PaymentsChart from './PaymentsChart';

const Dashboard = ({
  isLoading,
  numUsers,
  usersData,
  numCreAItions,
  creAItionsData,
  totalIncome,
  paymentData,
}) => {
  const [showUserData, setShowUserData] = useState(true);
  const [showCreAItionData, setShowCreAItionData] = useState(false);
  const [showPaymentData, setShowPaymentData] = useState(false);

  const handleShowUserData = () => {
    setShowUserData(true);
    setShowCreAItionData(false);
    setShowPaymentData(false);
  };

  const handleShowCreAitionData = () => {
    setShowCreAItionData(true);
    setShowUserData(false);
    setShowPaymentData(false);
  };

  const handleShowPaymentData = () => {
    setShowPaymentData(true);
    setShowUserData(false);
    setShowCreAItionData(false);
  };

  return (
    <>
      <section className='w-full p-4 bg-white'>
        {isLoading ? (
          <div className='h-screen flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 w-full'>
            <div className='col-span-3 p-2 gap-3 flex flex-col justify-between items-center h-full'>
              <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 w-full mb-4'>
                <div
                  onClick={handleShowUserData}
                  className='w-full flex flex-col justify-center items-center bg-[#A4D8E9] p-5 rounded-xl gap-5 transition-transform transform hover:scale-105 cursor-pointer shadow-lg'
                >
                  <div className='w-full flex justify-between items-center'>
                    <h1 className='text-md text-black font-semibold'>
                      Total Users
                    </h1>
                    <h1 className='text-green-600 font-semibold'>+21.75%</h1>
                  </div>
                  <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col justify-center items-start gap-1'>
                      <h1 className='text-3xl text-black font-semibold'>
                        {numUsers}
                      </h1>
                    </div>
                    <div className='bg-[#6BAECB] cursor-pointer text-black p-3 rounded-full'>
                      <FaUsers className='w-[30px] h-[30px]' />
                    </div>
                  </div>
                </div>
                <div
                  onClick={handleShowCreAitionData}
                  className='w-full flex flex-col justify-center items-center bg-[#FFC0CB] p-5 rounded-xl gap-5 transition-transform transform hover:scale-105 cursor-pointer shadow-lg'
                >
                  <div className='w-full flex justify-between items-center'>
                    <h1 className='text-md text-black font-semibold'>
                      Total CreAItions
                    </h1>
                    <h1 className='text-green-600 font-semibold'>+21.75%</h1>
                  </div>
                  <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col justify-center items-start gap-1'>
                      <h1 className='text-3xl text-black font-semibold'>
                        {numCreAItions}
                      </h1>
                    </div>
                    <div className='bg-[#FFAEB9] cursor-pointer text-black p-3 rounded-full'>
                      <IoMdImages className='w-[30px] h-[30px]' />
                    </div>
                  </div>
                </div>
                <div
                  onClick={handleShowPaymentData}
                  className='w-full flex flex-col justify-center items-center bg-[#C9A0DC] p-5 rounded-xl gap-5 transition-transform transform hover:scale-105 cursor-pointer shadow-lg'
                >
                  <div className='w-full flex justify-between items-center'>
                    <h1 className='text-md text-black font-semibold'>
                      Total Income
                    </h1>
                    <h1 className='text-green-600 font-semibold'>+21.75%</h1>
                  </div>
                  <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col justify-center items-start gap-1'>
                      <h1 className='text-3xl text-black font-semibold'>
                        ${totalIncome}
                      </h1>
                    </div>
                    <div className='bg-[#A56FB5] cursor-pointer text-black p-3 rounded-full'>
                      <FaMoneyBillWave className='w-[30px] h-[30px]' />
                    </div>
                  </div>
                </div>
              </div>
              {showUserData && <UsersChart usersData={usersData} />}
              {showCreAItionData && (
                <CreAItionsChart creAItionsData={creAItionsData} />
              )}
              {showPaymentData && <PaymentsChart paymentData={paymentData} />}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
