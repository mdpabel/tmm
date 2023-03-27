import Image from 'next/image';
import banner from '@/assets/images/banner.png';
import AnimatedHeader from '@/components/AnimatedHeader';
import Head from 'next/head';
import { Lato } from '@next/font/google';
import AppLayout from '@/layouts/AppLayout';

const lato = Lato({
  variable: '--lato-font',
  weight: ['100', '300', '400', '700', '900'],
  // display: 'fallback',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='max-w-6xl py-4 mx-auto md:pt-32 lg:pt-5'>
        <div className='container flex flex-col items-center space-y-5 md:flex-row'>
          <div className='w-full md:w-1/2'>
            <Image
              priority
              src={banner}
              width={1000}
              height={1000}
              alt='Banner'
            />
          </div>
          <div className='w-full space-y-4 md:text-right md:w-1/2 md:space-y-5'>
            <div>
              <h2 className='text-2xl font-semibold tracking-wide md:text-4xl text-custom'>
                <AnimatedHeader />
              </h2>
              <h1 className='text-4xl font-semibold tracking-wider md:text-6xl text-custom'>
                with tmmemploy
              </h1>
            </div>
            <p className='text-sm tracking-wider md:pl-10'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestiae, dolores doloremque unde magni fuga ea modi dolore vero
              obcaecati odio dolor veniam. Veniam eligendi expedita tenetur.
              Dignissimos voluptate sit est deleniti, quam tempora eligendi
              iste,
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession({
//     req: context.req,
//   });

//   return {
//     props: {
//       session,
//     },
//   };
// };

Home.layout = AppLayout;
