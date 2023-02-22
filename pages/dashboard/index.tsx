import React from 'react';
import UserVerification from '@/components/UserVerification';
import DashboardLayout from '@/layouts/DashboardLayout';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const Dashboard = () => {
  return (
    <div className='pt-4'>
      <UserVerification />
    </div>
  );
};

Dashboard.layout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({
    req: context.req,
  });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Dashboard;
