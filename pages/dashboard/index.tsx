import React from 'react';
import UserVerification from '@/components/UserVerification';
import DashboardLayout from '@/layouts/DashboardLayout';

const Dashboard = ({ data }) => {
  console.log('data', data);
  return (
    <div className='pt-4'>
      <UserVerification />
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      data: 1,
    },
  };
}

Dashboard.layout = DashboardLayout;

export default Dashboard;
