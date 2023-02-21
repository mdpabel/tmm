import React, { useEffect } from 'react';
import UserVerification from '@/components/UserVerification';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useForceUpdate } from '@/hooks/useForce';

const Dashboard = () => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const handleRouteChange = () => {
      console.log('forceUpdate');
      forceUpdate();
    };

    addEventListener('hashchange', handleRouteChange);

    return () => {
      removeEventListener('hashchange', handleRouteChange);
    };
  }, [forceUpdate]);

  return (
    <div className='pt-4'>
      <UserVerification />
    </div>
  );
};

Dashboard.layout = DashboardLayout;

export default Dashboard;
