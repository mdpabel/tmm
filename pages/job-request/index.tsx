import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
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
import { OptionType, Select } from '@/components/Input';
import Modal from 'react-modal';
import PhoneIcon from '@/components/icons/PhoneIcon';
import MailIcon from '@/components/icons/MailIcon';
import Button from '@/components/Button';
import clsx from 'clsx';
import { useAsync } from '@/hooks/useAsync';
import { updateStatus } from '@/utils/applicationProvider';
import Spinner from '@/components/Spinner';
import { pusherJs } from '@/utils/pusherClient';
import notificationSound from '../../assets/sounds/notification.mp3';
import useSound from 'use-sound';

const jobStatus = [
  { label: 'PENDING', value: 'PENDING' },
  { label: 'ACCEPTED', value: 'ACCEPTED' },
  { label: 'REJECTED', value: 'REJECTED' },
];

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return data;
};

const JobRequest = () => {
  const [play] = useSound(notificationSound);
  const [currentStatus, setCurrentStatus] = useState('PENDING');
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [jobs, setJobs] = useState({});
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);
  const [applicantDetailsOpen, setApplicantDetailsOpen] = useState(false);
  const [applicationId, setApplicationId] = useState(-1);

  const {
    data: updatedData,
    run,
    isLoading: isUpdating,
    isSuccess,
  } = useAsync();

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    '/api/job',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  // useEffect(() => {
  //   const channel = pusherJs.subscribe('application');

  //   channel.bind('updatedApplication', function (updatedData: ApplicationType) {
  //     console.log(updatedData);
  //   });
  // }, []);

  useEffect(() => {
    if (data) {
      const jobsOptions: OptionType[] = [];
      const transformedJobs = {};

      data?.data?.forEach((job: JobType) => {
        jobsOptions.push({
          label: job.title,
          value: job.title,
        });
        // @ts-ignore
        jobs[job.title] = {
          // @ts-ignore
          applications: job.applications,
          jobId: job.id,
        };
      });

      setOptions(jobsOptions);
      if (jobsOptions.length > 0) {
        setSelectedOption(jobsOptions[0].value);
      }
      // @ts-ignore
      setJobs[{ ...jobs, ...transformedJobs }];
    }
  }, [data, jobs]);

  const handleStatusUpdate = (
    applicationId: number,
    newStatus: string,
    jobId: number
  ) => {
    setApplicationId(applicationId);
    run(updateStatus(applicationId, newStatus, jobId));
  };

  return (
    <div className='w-full space-y-8 sm:px-6'>
      <Title>All requested applications</Title>
      <div>
        <Select onChange={(e) => setSelectedOption(e)} options={options} />
      </div>
      <div>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <HeadData>Job Title</HeadData>
                <HeadData>Applicant Name</HeadData>
                <HeadData>Applied At</HeadData>
                <HeadData>cover letter</HeadData>
                <HeadData>Applicant Details</HeadData>
                <HeadData>status</HeadData>
                <HeadData>Action</HeadData>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs &&
                selectedOption &&
                // @ts-ignore
                jobs[selectedOption]?.applications.map(
                  ({
                    id,
                    applicantName,
                    applicationStatus,
                    appliedAt,
                    coverLetter,
                    // @ts-ignore
                    mover,
                  }: ApplicationType) => (
                    <TableRow key={id}>
                      <TableData className='text-center '>
                        {selectedOption}
                      </TableData>
                      <TableData className='text-center'>
                        {applicantName}
                      </TableData>
                      <TableData className='text-center'>
                        {formateDate(appliedAt)}
                      </TableData>
                      <TableData className='text-center '>
                        <div
                          onClick={() => setCoverLetterOpen(!coverLetterOpen)}
                          className='flex justify-center my-4 cursor-pointer'
                        >
                          <LinkIcon />
                        </div>
                      </TableData>
                      <TableData className='text-center'>
                        <div
                          onClick={() =>
                            setApplicantDetailsOpen(!applicantDetailsOpen)
                          }
                          className='flex justify-center my-4 cursor-pointer'
                        >
                          <LinkIcon />
                        </div>
                      </TableData>

                      <TableData className='text-center'>
                        {/* <h2>{applicationStatus}</h2> */}
                        <select
                          className={clsx({
                            'text-green-700 font-extrabold':
                              applicationStatus === 'ACCEPTED',
                          })}
                          onChange={(e) => setCurrentStatus(e.target.value)}
                        >
                          <option value={applicationStatus}>
                            {applicationStatus}
                          </option>
                          {applicationStatus !== 'ACCEPTED' &&
                            jobStatus.map(
                              (jobS, idx) =>
                                applicationStatus !== jobS.value && (
                                  <option key={idx} value={jobS.value}>
                                    {jobS.label}
                                  </option>
                                )
                            )}
                        </select>
                      </TableData>
                      <TableData>
                        <Button
                          disabled={applicationStatus === 'ACCEPTED'}
                          type='button'
                          onClick={() => {
                            handleStatusUpdate(
                              id,
                              currentStatus,
                              // @ts-ignore
                              jobs[selectedOption]?.jobId
                            );
                          }}
                        >
                          Updated
                          {isUpdating && applicationId == id && <Spinner />}
                        </Button>
                      </TableData>
                      <Modal
                        style={{
                          content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                          },
                        }}
                        isOpen={coverLetterOpen}
                        onRequestClose={() => setCoverLetterOpen(false)}
                      >
                        <div className='max-w-xs space-y-3 text-center md:max-w-md'>
                          {coverLetter}
                        </div>
                      </Modal>

                      <Modal
                        style={{
                          content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                          },
                        }}
                        isOpen={applicantDetailsOpen}
                        onRequestClose={() => setApplicantDetailsOpen(false)}
                      >
                        <div className='max-w-xs space-y-3 text-center md:max-w-md'>
                          <label className='text-lg font-bold text-gray-900'>
                            Name: {applicantName}
                          </label>
                          <p className='mt-2 leading-relaxed text-center text-gray-800'>
                            {mover.bio}
                          </p>

                          <div className='flex justify-center space-x-4'>
                            <a href={`mailto:${mover?.user?.email}`}>
                              <MailIcon />
                            </a>
                            <a href={`tel:${mover?.mobile}`}>
                              <PhoneIcon />
                            </a>
                          </div>
                        </div>
                      </Modal>
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
