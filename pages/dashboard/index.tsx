import UserVerification from '@/components/UserVerification';
import DashboardLayout from '@/layouts/DashboardLayout';
import React from 'react';

const Dashboard = () => {
  return (
    <div className='pt-4'>
      <UserVerification />
    </div>
  );
};

Dashboard.layout = DashboardLayout;

export default Dashboard;
