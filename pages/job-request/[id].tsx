import React from 'react';
import { useRouter } from 'next/router';
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

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data;
};

const JobRequest = () => {
  const router = useRouter();
  const { id } = router.query;

  //   if (!id) {
  //     return 'Loading...';
  //   }

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/application/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div className='w-full space-y-8 sm:px-6'>
      <Title>All requested applications</Title>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <HeadData>Job Title</HeadData>
              <HeadData>Applicant Name</HeadData>
              <HeadData>Applicant Email</HeadData>
              <HeadData>Applicant Phone</HeadData>
              <HeadData>Applied At</HeadData>
              <HeadData>status</HeadData>
              <HeadData>Action</HeadData>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map(
              ({
                id,
                createdAt,
                applicantName,
                applicationStatus,
                appliedAt,
                // @ts-ignore
                job,
              }: ApplicationType) => (
                <TableRow key={id}>
                  <TableData className='text-center'>{job.title}</TableData>
                  <TableData className='text-center'>
                    {job.company.companyName}
                  </TableData>
                  <TableData className='text-center'>{job.county}</TableData>
                  <TableData className='text-center'>
                    {formateDate(appliedAt)}
                  </TableData>
                  <TableData className='text-center'>{job.position}</TableData>
                  <TableData className='text-center'>
                    {applicationStatus}
                  </TableData>
                  <TableData className='text-center'>
                    <Link href={`/jobs/${job.id}`}>
                      <LinkIcon />
                    </Link>
                  </TableData>
                </TableRow>
              )
            )}

            {isLoading &&
              new Array(10).fill(0).map((_, idx) => (
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
        </Table>
      </TableWrapper>
    </div>
  );
};

JobRequest.layout = DashboardLayout;

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

export default JobRequest;
