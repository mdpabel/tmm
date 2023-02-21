import Filter from '@/components/Filter';
import { Suspense } from 'react';
import ServiceFallBack from '@/components/ServiceFallBack';
import AppLayout from '@/layouts/AppLayout';
import { ServiceCard } from '@/components/ServiceCard';
import Title from '@/components/Title';
import { ServiceType } from '@/types/serviceType';

export async function getStaticProps() {
  const res = await prisma.service.findMany();
  const services = JSON.parse(JSON.stringify(res));

  return { props: { services } };
}

function CountyServices({ services }: { services: ServiceType[] }) {
  return (
    <>
      <Filter label='County Services' />
      <Suspense fallback={<ServiceFallBack />}>
        <div className='flex flex-wrap justify-center gap-5 pt-6'>
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
    </>
  );
}

CountyServices.layout = AppLayout;

export default CountyServices;
