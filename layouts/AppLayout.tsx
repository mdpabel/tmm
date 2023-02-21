import Footer from '@/components/Footer';
import Header from '@/components/Navbar';
import { ChildrenType } from '@/types/reactTypes';

const AppLayout = ({ children }: ChildrenType) => {
  return (
    <div>
      <Header />
      <main
        style={{
          minHeight: 'calc(100vh - 90px)',
          padding: '25px',
        }}
        className='flex flex-col w-full justify-center items-center container mx-auto'
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
