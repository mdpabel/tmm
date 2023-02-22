import Button from '@/components/Button';
import React, { use } from 'react';
import prisma from '@/db/postgresql';
import { formateDate } from '@/utils/formateDate';
import { JobType } from '@/types/jobType';
import AppLayout from '@/layouts/AppLayout';
import { CompanyType } from '@/types/compnayTypes';

interface ParamsType {
  params: {
    id: string;
  };
}

export async function getStaticPaths() {
  const jobs = await prisma.job.findMany({
    include: {
      company: true,
    },
  });

  const paths = jobs?.map((jobs) => ({
    params: { id: jobs.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: ParamsType) {
  const data = await prisma.job.findFirst({
    where: {
      id: +params.id,
    },
    include: {
      company: true,
    },
  });
  const job = JSON.parse(JSON.stringify(data));

  return {
    props: { job },
    revalidate: 60,
  };
}

interface JobListingType extends JobType {
  company?: CompanyType;
}

const JobParams = ({ job }: { job: JobListingType }) => {
  if (!job) {
    return <h2>No job posted yet</h2>;
  }

  const {
    jobStatus,
    description,
    county,
    title,
    rate,
    position,
    createdAt,
    movingCompanyId,
    updatedAt,
    company,
  }: JobListingType = job;

  const publishedDate = formateDate(createdAt);

  if (!company) {
    return <h2>No job posted yet</h2>;
  }

  const { companyName, companyInfo } = company;

  return (
    <div className='container flex flex-col gap-10 px-10 md:max-w-3xl md:flex-row md:pt-16 lg:max-w-4xl lg:pt-2'>
      <div className='w-full p-5 space-y-5 border shadow md:w-1/3'>
        <h2 className='px-2 py-1 text-purple-100 bg-purple-600 rounded h-fit'>
          Job Summary
        </h2>
        <div className='space-y-2 text-sm '>
          <p>Published On : {publishedDate}</p>
          <p>Job Position : {position}</p>
          <p>County : {county}</p>
          <p>Rate : ${rate}</p>
        </div>
      </div>
      <div className='w-full p-5 space-y-4 bg-white rounded shadow-sm md:w-2/3'>
        <h2 className='font-bold text-purple-900'>Job Position : {position}</h2>
        <h3 className='font-semibold'>{title}</h3>
        <h3 className='font-semibold'>Company : {companyName}</h3>

        <div className='space-y-2'>
          <h3 className='font-semibold'>Job Description</h3>
          <p className='text-sm leading-loose break-words'>{description}</p>
        </div>
        <div className='text-sm leading-loose'>
          <p>
            <span className='font-semibold'>Published On:</span> {publishedDate}
          </p>
          <p>
            <span className='font-semibold'>Job Position:</span> {position}
          </p>
          <p>
            <span className='font-semibold'>County:</span> {county}
          </p>
          <p>
            <span className='font-semibold'>Rate:</span> Jan 24, 2023
          </p>
        </div>
        <div>
          <h3 className='font-semibold'>About company</h3>
          <p className='text-sm leading-loose'>{companyInfo}</p>
        </div>

        <Button intent='secondary' size='medium'>
          Apply Now
        </Button>
      </div>
    </div>
  );
};

JobParams.layout = AppLayout;

export default JobParams;
