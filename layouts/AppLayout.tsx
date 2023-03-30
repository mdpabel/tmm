import Footer from '@/components/Footer';
import Header from '@/components/Navbar';
import { ChildrenType } from '@/types/reactTypes';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['500', '700'] });

const AppLayout = ({ children }: ChildrenType) => {
  return (
    <div>
      <Header />
      <main
        className={inter.className}
        style={{
          marginTop: '100px',
          marginBottom: '20px',
          minHeight: '80vh',
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
