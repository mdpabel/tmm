import React from 'react';
import JobListing from '@/components/JobListing';
import prisma from '@/db/postgresql';
import AppLayout from '@/layouts/AppLayout';
import { JobType } from '@/types/jobType';
import JobFiltering from '@/components/JobFiltering';

const Jobs = ({ jobs }: { jobs: JobType[] }) => {
  return (
    <div className='flex-auto w-full space-y-4'>
      <div className='flex flex-col justify-between gap-10 md:flex-row'>
        <div className='w-full md:w-1/3'>
          <JobFiltering />
        </div>
        <div className='w-full space-y-6 md:w-2/3'>
          {jobs.map((job) => (
            <JobListing key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

Jobs.layout = AppLayout;

export async function getStaticProps() {
  const jobsRes = await prisma.job.findMany({
    include: {
      company: true,
    },
  });
  const jobs = JSON.parse(JSON.stringify(jobsRes));

  return {
    props: {
      jobs,
    },
    revalidate: 30,
  };
}

export default Jobs;
