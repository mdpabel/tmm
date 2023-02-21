import React from 'react';
import authOptions from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';
import UserVerification from '@/components/UserVerification';
import DashboardLayout from '@/layouts/DashboardLayout';

const Dashboard = () => {
  return (
    <div className='pt-4'>
      <UserVerification />
    </div>
  );
};

Dashboard.layout = DashboardLayout;

// export async function getServerSideProps(context) {
//   const session = await getSession({
//     req: context.req,
//   });

//   console.log('session', session);

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
// }

export default Dashboard;
