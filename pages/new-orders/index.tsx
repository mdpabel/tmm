import Image from 'next/image';
import Filter from '@/components/Filter';
import { GetServerSideProps } from 'next';
import {
  HeadData,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableRow,
  TableWrapper,
} from '@/components/Table';
import useSWR, { SWRConfig } from 'swr';
import Title from '@/components/Title';
import DashboardLayout from '@/layouts/DashboardLayout';
import { getSession } from 'next-auth/react';
import { CustomSession } from '@/types/session';
import prisma from '@/db/postgresql';
import { formateDate } from '@/utils/formateDate';
import { OrderType } from '@/types/orderTypes';
import { useLoading } from './../../hooks/useLoadingIndicator';

const serviceHeader = [
  'Order ID',
  'image',
  'Title',
  'price',
  'Customer email',
  'Placed on',
  'status',
];

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data;
};

const NewOrders = () => {
  const { data, isLoading, error } = useSWR('/api/orders', fetcher, {
    revalidateOnMount: true,
  });

  const orders = data?.data as OrderType[];

  return (
    <div className='w-full space-y-8 sm:px-6'>
      <div className='flex items-center justify-between'>
        <Title>New Orders</Title>
        <div>Filter</div>
      </div>

      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              {serviceHeader.map((item, idx) => (
                <HeadData key={idx}>{item}</HeadData>
              ))}
            </TableRow>
          </TableHead>
          {isLoading && (
            <TableBody>
              {new Array(2).fill(0)?.map((_, idx) => (
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
            </TableBody>
          )}

          {!isLoading && data && (
            <TableBody>
              {orders?.map(
                // @ts-ignore
                ({ id, service, totalPrice, createdAt, user }: OrderType) => (
                  <TableRow key={id}>
                    <TableData className='text-center'>{id}</TableData>
                    <TableData className='text-center'>
                      <Image
                        width={70}
                        height={70}
                        src={service?.serviceImg}
                        alt={service?.serviceName}
                      />
                    </TableData>
                    <TableData className='text-center'>
                      {service?.serviceName}
                    </TableData>
                    <TableData className='text-center'>{totalPrice}</TableData>
                    <TableData className='text-center'>{user?.email}</TableData>
                    <TableData className='text-center'>
                      {formateDate(createdAt)}
                    </TableData>
                    <TableData className='text-center'>
                      <select name='order-status' id='order-status'>
                        <option value='pending'>Pending</option>
                        <option value='completed'>Completed</option>
                        <option value='Rejected'>Rejected</option>
                      </select>
                    </TableData>
                  </TableRow>
                )
              )}
            </TableBody>
          )}
        </Table>
        {error && <div className='w-full text-center'>{error?.message}</div>}
      </TableWrapper>
    </div>
  );
};

NewOrders.layout = DashboardLayout;

export default NewOrders;
