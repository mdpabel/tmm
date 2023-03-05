import React from 'react';
import { useSession } from 'next-auth/react';
import UserVerification from '@/components/UserVerification';
import DashboardLayout from '@/layouts/DashboardLayout';
import { GetServerSideProps } from 'next';
import NotificationCard from '@/components/NotificationCard';
import Graph from '@/components/Graph';
import Title from '@/components/Title';
import { CustomSession } from '@/types/session';

const Dashboard = () => {
  const { data, status } = useSession();

  const role =
    (data as CustomSession)?.user?.role === 'MOVING_COMPANY'
      ? 'company'
      : (data as CustomSession)?.user?.role === 'MOVER'
      ? 'employee'
      : 'client';

  console.log(role + ' <=> ' + data);

  if (
    !(data as CustomSession)?.user?.hasUploadedDocuments &&
    role !== 'client'
  ) {
    return <UserVerification role={role} />;
  }

  return (
    <div className='flex flex-col pt-4'>
      <div>
        <Title>
          Welcome,{' '}
          {(data as CustomSession)?.user?.firstName +
            ' ' +
            (data as CustomSession)?.user?.lastName}
        </Title>
      </div>
      <div className='grid grid-cols-1 m-auto space-x-4 md:grid-cols-2'>
        <NotificationCard />
        <Graph />
        <Graph />
      </div>
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
