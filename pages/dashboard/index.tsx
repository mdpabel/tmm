import React from 'react';
import { getToken } from 'next-auth/jwt';
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
  const data = await getSession({
    req: context.req,
  });


  if (!data) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: {
        data,
        status: 'authenticated',
      },
    },
  };
};

export default Dashboard;
