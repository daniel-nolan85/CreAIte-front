import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import PageLoader from '../components/PageLoader';

const Subscription = () => {
  const { token, _id, name, profileImage } =
    useSelector((state) => state.user) || {};
  const dispatch = useDispatch();

  if (!_id) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <section className='max-w-7xl mx-auto p-4'>
        <h1>Subscription</h1>
      </section>
    </>
  );
};

export default Subscription;
