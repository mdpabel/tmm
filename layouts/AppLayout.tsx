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
        }}
        className='container flex flex-col items-center justify-center w-full px-6 pb-4 mx-auto pt'
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
