import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Modal from 'react-modal';
import { SessionProvider } from 'next-auth/react';
import { Fragment } from 'react';
import type { Page } from '../types/page';
import '../styles/sidebar.css';
import 'react-tooltip/dist/react-tooltip.css';

type Props = AppProps & {
  Component: Page;
};

Modal.setAppElement('#__next');

const MyApp = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <SessionProvider session={pageProps.session} refetchOnWindowFocus={true}>
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </SessionProvider>
  );
};

export default MyApp;
