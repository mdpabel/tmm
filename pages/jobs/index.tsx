import React from 'react';
import JobListing from '@/components/JobListing';
import prisma from '@/db/postgresql';
import AppLayout from '@/layouts/AppLayout';
import { JobType } from '@/types/jobType';

const Jobs = ({ jobs }: { jobs: JobType[] }) => {
  return (
    <div className='space-y-4'>
      {jobs.map((job) => (
        <JobListing key={job.id} job={job} />
      ))}
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
