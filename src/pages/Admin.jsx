import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import Analytics from '../components/admin/Analytics';
import Messages from '../components/admin/Messages';
import Users from '../components/admin/Users';
import CreAItions from '../components/admin/CreAItions';

const Admin = () => {
  const [activeNavItem, setActiveNavItem] = useState('showDashboard');

  return (
    <>
      <main className='w-full h-screen'>
        <Navbar />
        <div className='flex justify-between items-start bg-[#000300]'>
          <Sidebar
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
          />
          {activeNavItem === 'showDashboard' && <Dashboard />}
          {activeNavItem === 'showAnalytics' && <Analytics />}
          {activeNavItem === 'showMessages' && <Messages />}
          {activeNavItem === 'showUsers' && <Users />}
          {activeNavItem === 'showCreAItions' && <CreAItions />}
        </div>
      </main>
    </>
  );
};

export default Admin;
