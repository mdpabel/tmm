import Link from 'next/link';

function Footer() {
  return (
    <div className='max-w-6xl pt-16 mx-auto'>
      <div className='w-full py-4'>
        <div className='container mx-auto text-center xl:flex lg:flex xl:text-left lg:text-left'>
          <div className='mb-6 text-center xl:w-3/6 lg:w-3/6 sm:w-full xl:text-left xl:mb-0 lg:mb-0'>
            <p className='text-gray-800'>2023 tmmemploy. All Rights Reserved</p>
          </div>
          <div className='xl:w-3/6 lg:w-3/6 sm:w-full'>
            <ul className='flex justify-around space-x-4'>
              <Link
                href='/'
                className='mb-3 text-gray-800 hover:text-gray-900 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0'
              >
                Terms of service
              </Link>
              <Link
                href='/'
                className='mb-3 text-gray-800 hover:text-gray-900 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0'
              >
                Privacy Policy
              </Link>
              <Link
                href='/'
                className='mb-3 text-gray-800 hover:text-gray-900 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0'
              >
                About Us
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
