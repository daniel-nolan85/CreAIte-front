import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { IoMdImages } from 'react-icons/io';
import Chart from './Chart';
import Loader from '../Loader';
import { fetchData } from '../../requests/admin';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [numUsers, setNumUsers] = useState(0);
  const [numCreAItions, setNumCreAItions] = useState(0);

  const { token } = useSelector((state) => state.user) || {};

  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);

  const getData = async () => {
    await fetchData(token)
      .then((res) => {
        console.log(res.data);
        setNumUsers(res.data.users);
        setNumCreAItions(res.data.creations);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(setIsLoading(false));
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
            <div className='col-span-2 p-2 gap-3 flex flex-col justify-between items-center h-full'>
              <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 w-full mb-4'>
                <div className='w-full flex flex-col justify-center items-center bg-[#A4D8E9] p-5 rounded-xl gap-5 transition-transform transform hover:scale-105 cursor-pointer shadow-lg'>
                  <div className='w-full flex justify-between items-center'>
                    <h1 className='text-md text-black font-semibold'>Users</h1>
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
                <div className='w-full flex flex-col justify-center items-center bg-[#FFC0CB] p-5 rounded-xl gap-5 transition-transform transform hover:scale-105 cursor-pointer shadow-lg'>
                  <div className='w-full flex justify-between items-center'>
                    <h1 className='text-md text-black font-semibold'>
                      CreAItions
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
                <div className='w-full flex flex-col justify-center items-center bg-[#C9A0DC] p-5 rounded-xl gap-5 transition-transform transform hover:scale-105 cursor-pointer shadow-lg'>
                  <div className='w-full flex justify-between items-center'>
                    <h1 className='text-md text-black font-semibold'>Income</h1>
                    <h1 className='text-green-600 font-semibold'>+21.75%</h1>
                  </div>
                  <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col justify-center items-start gap-1'>
                      <h1 className='text-3xl text-black font-semibold'>
                        $10,328
                      </h1>
                    </div>
                    <div className='bg-[#A56FB5] cursor-pointer text-black p-3 rounded-full'>
                      <FaMoneyBillWave className='w-[30px] h-[30px]' />
                    </div>
                  </div>
                </div>
              </div>
              <Chart />
            </div>

            <div className='p-2 flex flex-col justify-center items-center gap-4 h-full'>
              <div className='bg-slate-100 p-8 w-full h-1/2 rounded-xl flex flex-col justify-center items-center gap-6'></div>

              <div className='bg-slate-100 p-8 w-full h-1/2 rounded-xl flex flex-col justify-center items-center gap-6'></div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
