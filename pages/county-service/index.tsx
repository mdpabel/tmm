import Filter from '@/components/Filter';
import { Suspense } from 'react';
import ServiceFallBack from '@/components/ServiceFallBack';
import AppLayout from '@/layouts/AppLayout';
import { ServiceCard } from '@/components/ServiceCard';
import Title from '@/components/Title';
import { ServiceType } from '@/types/serviceType';
import prisma from '@/db/postgresql';

export async function getStaticProps() {
  const res = await prisma.service.findMany();
  const services = JSON.parse(JSON.stringify(res));

  return { props: { services }, revalidate: 1 };
}

function CountyServices({ services }: { services: ServiceType[] }) {
  return (
    <div className='flex-auto w-full'>
      <Filter label='County Services' />
      <Suspense fallback={<ServiceFallBack />}>
        <div className='flex flex-wrap justify-center gap-5 pt-6 md:justify-start'>
          {services.length ? (
            services.map((service) => (
              <ServiceCard
                id={service.id}
                key={service.id}
                packageImage={service.serviceImg}
                name={service.serviceName}
                price={service.servicePrice}
              />
            ))
          ) : (
            <Title>There is no services</Title>
          )}
        </div>
      </Suspense>
    </div>
  );
}

CountyServices.layout = AppLayout;

export default CountyServices;
