import Footer from '@/components/Footer';
import Header from '@/components/Navbar';
import { ChildrenType } from '@/types/reactTypes';

const AppLayout = ({ children }: ChildrenType) => {
  return (
    <div>
      <Header />
      <main
        style={{
          marginTop: '100px',
          marginBottom: '20px',
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
