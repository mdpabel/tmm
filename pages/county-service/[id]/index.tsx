import React from 'react';
import Image from 'next/image';
import prisma from '@/db/postgresql';
import AppLayout from '@/layouts/AppLayout';
import { ServiceType } from '@/types/serviceType';

interface ParamsType {
  params: {
    id: string;
  };
}

export async function getStaticPaths() {
  const res = await prisma.service.findMany();
  const services: ServiceType[] = JSON.parse(JSON.stringify(res));

  const paths = services?.map((service) => ({
    params: { id: service.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: ParamsType) {
  const res = await prisma.service.findFirst({
    where: {
      id: +params?.id,
    },
  });

  const service = JSON.parse(JSON.stringify(res));

  if (!service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service,
    },
  };
}

const Service = ({ service }: { service: ServiceType }) => {
  const {
    serviceCounty,
    serviceName,
    servicePrice,
    serviceMovers,
    serviceHours,
    serviceDesc,
    serviceDisclaimer,
    serviceImg,
  } = service;

  return (
    <section className='overflow-hidden text-gray-700 bg-white body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-wrap mx-auto lg:w-4/5'>
          <Image
            width={300}
            height={300}
            alt={serviceName}
            className='object-cover object-center w-full p-4 border border-gray-200 rounded lg:w-1/2 lg:h-1/2'
            src={serviceImg}
          />
          <div className='w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0'>
            <h2 className='text-sm tracking-widest text-gray-500 title-font'>
              {serviceCounty}
            </h2>
            <h1 className='py-4 mb-1 text-3xl font-medium text-gray-900 title-font'>
              {serviceName}
            </h1>

            <p className='leading-relaxed'>{serviceDesc}</p>
            <div className='flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-200'></div>
            <div className='flex'>
              <span className='text-2xl font-medium text-gray-900 title-font'>
                ${servicePrice}
              </span>
              <button className='flex px-6 py-2 ml-auto text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600'>
                Button
              </button>
            </div>

            <div className='pt-4'>
              <h2 className='py-2 text-xl font-semibold'>Service Details</h2>
              <div className='flex justify-between py-2 border-b'>
                <span>County</span>
                <span>{serviceCounty}</span>
              </div>
              <div className='flex justify-between py-2 border-b'>
                <span>Movers</span>
                <span>{serviceMovers}</span>
              </div>
              <div className='flex justify-between py-2 border-b'>
                <span>Hours</span>
                <span>{serviceHours}</span>
              </div>
              <div className='flex justify-between py-2 border-b'>
                <span>Price</span>
                <span>${servicePrice}</span>
              </div>
            </div>

            <p className='py-4 text-sm text-gray-600'>{serviceDisclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

Service.layout = AppLayout;

export default Service;
