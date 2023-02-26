import React from 'react';
import useSWR, { SWRConfig } from 'swr';
import DashboardLayout from '@/layouts/DashboardLayout';
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
import { ApplicationType } from '@/types/applicationTypes';
import { JobType } from '@/types/jobType';
import { formateDate } from '@/utils/formateDate';
import prisma from '@/db/postgresql';
import { BarSkeleton } from '@/components/Skeletons';
import Link from 'next/link';
import LinkIcon from '@/components/icons/LinkIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data;
};

const ManageJobs = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    '/api/job',
    fetcher
  );

  const handleDelete = () => {
    console.log('handleDelete');
  };

  return (
    <div className='w-full space-y-8 sm:px-6'>
      <Title>Manage your jobs</Title>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <HeadData>Title</HeadData>
              <HeadData>Position</HeadData>
              <HeadData>County</HeadData>
              <HeadData>Rate</HeadData>
              <HeadData>Created At</HeadData>
              <HeadData>status</HeadData>
              <HeadData>Delete</HeadData>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map(
              ({
                id,
                title,
                rate,
                position,
                jobStatus,
                county,
                createdAt,
              }: JobType) => (
                <TableRow key={id}>
                  <TableData className='text-center'>{title}</TableData>
                  <TableData className='text-center'>{position}</TableData>
                  <TableData className='text-center'>{county}</TableData>
                  <TableData className='text-center'>{rate}</TableData>
                  <TableData className='text-center'>
                    {formateDate(createdAt)}
                  </TableData>
                  <TableData className='text-center'>{jobStatus}</TableData>
                  <TableData className='flex justify-center '>
                    <div
                      onClick={() => handleDelete}
                      className='flex justify-center my-4 cursor-pointer'
                    >
                      <DeleteIcon />
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

ManageJobs.layout = DashboardLayout;

// export async function getStaticProps() {
//   const data = await prisma.application.findMany({
//     include: {
//       job: {
//         include: {
//           company: true,
//         },
//       },
//     },
//   });

//   const applications = JSON.parse(JSON.stringify(data));

//   return {
//     props: { applications },
//   };
// }

export default ManageJobs;
