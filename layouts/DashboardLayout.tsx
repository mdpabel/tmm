import Sidebar from '@/components/Sidebar';
import { SessionProvider } from 'next-auth/react';
import { ChildrenType } from '@/types/reactTypes';

const DashboardLayout = ({ children }: ChildrenType) => {
  return (
    <div className='flex flex-no-wrap h-full min-h-screen'>
      <aside>
        <Sidebar />
      </aside>
      <section className='container flex flex-col items-center justify-center w-full min-h-screen px-4 py-6'>
        {children}
      </section>
    </div>
  );
};

export default DashboardLayout;
