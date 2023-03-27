import prisma from '@/db/postgresql';
import Image from 'next/image';
import Filter from '@/components/Filter';
import DeleteIcon from '@/components/icons/DeleteIcon';
import EditIcon from '@/components/icons/EditIcon';
import { ServiceType } from '@/types/serviceType';

import {
  HeadData,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableRow,
  TableWrapper,
} from '@/components/Table';
import Title from '@/components/Title';
import DashboardLayout from '@/layouts/DashboardLayout';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

const serviceHeader = [
  'packageImage',
  'name',
  'county',
  'price',
  'movers',
  'hours',
  'edit',
  'delete',
];

export async function getServerSideProps() {
  const res = await prisma.service.findMany();
  const services = JSON.parse(JSON.stringify(res));

  return { props: { services } };
}

const ServiceInventory = ({ services }: { services: ServiceType[] }) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    '/api/service',
    fetcher
  );

  const handleDelete = () => {};
  const handleEdit = () => {};

  return (
    <div className='w-full space-y-8 sm:px-6'>
      <Title>Manage your jobs</Title>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <HeadData>packageImage</HeadData>
              <HeadData>name</HeadData>
              <HeadData>County</HeadData>
              <HeadData>price</HeadData>
              <HeadData>movers</HeadData>
              <HeadData>hours</HeadData>
              <HeadData>edit</HeadData>
              <HeadData>delete</HeadData>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map(
              ({
                id,
                serviceCounty,
                serviceImg,
                servicePrice,
                serviceName,
                serviceMovers,
                serviceHours,
              }: ServiceType) => (
                <TableRow key={id}>
                  <TableData className='text-center'>
                    <Image
                      width={100}
                      height={100}
                      src={serviceImg}
                      alt={serviceName}
                    />
                  </TableData>
                  <TableData className='text-center'>
                    {serviceName.slice(0, 20)}
                  </TableData>
                  <TableData className='text-center'>{serviceCounty}</TableData>
                  <TableData className='text-center'>{servicePrice}</TableData>
                  <TableData className='text-center'>{serviceMovers}</TableData>
                  <TableData className='text-center'>{serviceHours}</TableData>
                  <TableData className='text-center'>
                    <div
                      onClick={handleDelete}
                      className='flex justify-center my-4 cursor-pointer'
                    >
                      <DeleteIcon />
                    </div>
                  </TableData>

                  <TableData className='text-center'>
                    <div
                      onClick={handleEdit}
                      className='flex justify-center my-4 cursor-pointer'
                    >
                      <EditIcon />
                    </div>
                  </TableData>
                </TableRow>
              )
            )}

            {isLoading &&
              new Array(2).fill(0).map((_, idx) => (
                <TableRow key={idx}>
                  <TableData className='text-center'>loading...</TableData>
                  <TableData className='text-center'>loading...</TableData>
                  <TableData className='text-center'>loading...</TableData>
                  <TableData className='text-center'>loading...</TableData>
                  <TableData className='text-center'>loading...</TableData>
                  <TableData className='text-center'>loading...</TableData>
                  <TableData className='text-center'>loading...</TableData>
                </TableRow>
              ))}

            {error && (
              <pre className='text-center text-red-600'>{error.message}</pre>
            )}
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );
};

ServiceInventory.layout = DashboardLayout;

export default ServiceInventory;
