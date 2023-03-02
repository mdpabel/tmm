import React from 'react';
import Image from 'next/image';
import prisma from '@/db/postgresql';
import AppLayout from '@/layouts/AppLayout';
import { ServiceType } from '@/types/serviceType';
import Input from '@/components/Input';
import ScheduledMove from '@/components/ScheduledMove';

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

  return { paths, fallback: true };
}

export async function getStaticProps({ params }: ParamsType) {
  const res = await prisma.service.findFirst({
    where: {
      id: +params?.id,
    },
    include: {
      company: true,
    },
  });

  if (!res) {
    return {
      notFound: true,
    };
  }

  const service = JSON.parse(JSON.stringify(res));

  return {
    props: {
      service,
    },
    revalidate: 1,
  };
}

const Service = ({ service }: { service: ServiceType }) => {
  if (!service) {
    return <h1>Loading...</h1>;
  }

  const {
    serviceCounty,
    serviceName,
    servicePrice,
    serviceMovers,
    serviceHours,
    serviceDesc,
    serviceDisclaimer,
    serviceImg,
    // @ts-ignore
    company,
  } = service;

  return (
    <>
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
              </div>

              <div className='pt-4'>
                <h2 className='py-2 text-xl font-semibold'>Service Details</h2>
                <div className='flex justify-between py-2 border-b'>
                  <span>Company</span>
                  <span>{company?.companyName}</span>
                </div>
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

              <ScheduledMove price={servicePrice} serviceHours={serviceHours} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Service.layout = AppLayout;

export default Service;
