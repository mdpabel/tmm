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
  'company',
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

const MyOrders = () => {
  const { data, isLoading, error } = useSWR('/api/my-orders', fetcher, {
    revalidateOnMount: true,
  });

  const orders = data?.data as OrderType[];

  return (
    <div className='w-full space-y-8 sm:px-6'>
      <div className='flex items-center justify-between'>
        <Title>My Orders</Title>
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
                ({
                  id,
                  service,
                  totalPrice,
                  serviceId,
                  createdAt,
                }: OrderType) => (
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
                    <TableData className='text-center'>
                      {service?.company?.companyName}
                    </TableData>
                    <TableData className='text-center'>
                      {formateDate(createdAt)}
                    </TableData>
                    <TableData className='text-center'>Pending</TableData>
                  </TableRow>
                )
              )}
            </TableBody>
          )}

          {error && <div>{error}</div>}
        </Table>
      </TableWrapper>
    </div>
  );
};

MyOrders.layout = DashboardLayout;

// export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
//   const session = (await getSession({ req })) as CustomSession;

//   if (!session || session.user?.role !== 'MOVING_CUSTOMER') {
//     return {
//       props: {
//         data: null,
//         error: 'You are not allowed to fetch the data',
//       },
//     };
//   }

//   const data = await prisma.order.findMany({
//     where: {
//       userId: +session.user.id,
//     },
//     include: {
//       service: {
//         include: {
//           company: true,
//         },
//       },
//     },
//   });

//   if (data.length === 0) {
//     return {
//       props: {
//         data: null,
//         error:
//           ' No orders found. Please try again later if you already placed any orders',
//       },
//     };
//   }

//   const orders = JSON.parse(JSON.stringify(data));

//   return {
//     props: {
//       data: orders,
//       error: null,
//     },
//   };
// };

export default MyOrders;
