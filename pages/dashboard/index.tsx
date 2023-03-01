import React from 'react';
import { useSession } from 'next-auth/react';
import UserVerification from '@/components/UserVerification';
import DashboardLayout from '@/layouts/DashboardLayout';
import { GetServerSideProps } from 'next';
import NotificationCard from '@/components/NotificationCard';
import Graph from '@/components/Graph';

const Dashboard = () => {
  const { data, status } = useSession();
  const isVerified = false;

  return (
    <div className='pt-4'>
      <div className='grid grid-cols-1 m-auto space-x-4 md:grid-cols-2'>
        <NotificationCard />
        <UserVerification />
        <Graph />
        <Graph />
      </div>
      {isVerified && <UserVerification />}
    </div>
  );
};

Dashboard.layout = DashboardLayout;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession({
//     req: context.req,
//   });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };

export default Dashboard;
