import React, { useEffect, useState } from 'react';
import useSWR, { SWRConfig } from 'swr';
import useSound from 'use-sound';
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
import notificationSound from '../../assets/sounds/notification.mp3';
import { JobType } from '@/types/jobType';
import { formateDate } from '@/utils/formateDate';
import prisma from '@/db/postgresql';
import { BarSkeleton } from '@/components/Skeletons';
import Link from 'next/link';
import LinkIcon from '@/components/icons/LinkIcon';
import useSocket from '@/hooks/useSocket';
import { pusherJs } from '@/utils/pusherClient';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data;
};

const JobTracking = () => {
  const [play] = useSound(notificationSound);
  // const socket = useSocket();
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    '/api/application',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data && data?.data) {
      setApplications(data.data);
    }
  }, [data]);

  useEffect(() => {
    const channel = pusherJs.subscribe('application');

    channel.bind('updatedApplication', function (updatedData: ApplicationType) {
      const updatedApplications = [...applications];
      updatedApplications.forEach((app) => {
        if (app.id === updatedData.id) {
          app.applicationStatus = updatedData.applicationStatus;
        }
        return app;
      });
      setApplications(updatedApplications);
      play();
    });
  }, [applications, play]);

  // useEffect((): any => {
  //   // connect to socket server

  //   if (!socket) return;

  //   // update chat on new message dispatched
  //   socket.on('updatedApplication', (updatedData: ApplicationType) => {
  //     console.log(updatedData);
  //     const updatedApplications = [...applications];
  //     updatedApplications.forEach((app) => {
  //       if (app.id === updatedData.id) {
  //         app.applicationStatus = updatedData.applicationStatus;
  //       }
  //       return app;
  //     });
  //     setApplications(updatedApplications);
  //     play();
  //   });

  //   // socket disconnet onUnmount if exists
  // }, [applications, play, socket]);

  return (
    <div className='w-full space-y-8 sm:px-6'>
      <Title>Track your applications</Title>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <HeadData>Job Title</HeadData>
              <HeadData>Company</HeadData>
              <HeadData>County</HeadData>
              <HeadData>Applied At</HeadData>
              <HeadData>Position</HeadData>
              <HeadData>status</HeadData>
              <HeadData>Job</HeadData>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.map(
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
                  <TableData
                    className={`text-center ${
                      applicationStatus === 'ACCEPTED'
                        ? 'text-green-700 font-bold'
                        : ''
                    }`}
                  >
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
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );
};

JobTracking.layout = DashboardLayout;

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

export default JobTracking;
