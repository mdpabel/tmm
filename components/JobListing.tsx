import Button from '@/components/Button';
import prisma from '@/db/postgresql';
import { CompanyType } from '@/types/compnayTypes';
import { JobType } from '@/types/jobType';
import Link from 'next/link';
import React, { use } from 'react';
import LocationIcon from './icons/LocationIcon';
import RightArrow from './icons/RightArrow';

interface JobListingType extends JobType {
  company?: CompanyType;
}

const JobListing = ({ job }: { job: JobListingType }) => {
  const {
    county,
    description,
    movingCompanyId,
    createdAt,
    jobStatus,
    position,
    rate,
    id,
    title,
    updatedAt,
    company,
  } = job;

  return (
    <div className='w-full'>
      <Link href={'/jobs/' + id}>
        <div className='flex flex-col justify-between w-full max-w-4xl gap-4 px-5 py-4 bg-white rounded-md shadow-xl shadow-gray-100 sm:flex-row sm:items-center'>
          <span className='inline-block text-sm text-purple-800'>
            {company?.companyName && company?.companyName.length > 20
              ? company?.companyName.substring(0, 20)
              : company?.companyName}
          </span>
          <h3 className='mt-px font-bold'>{title}</h3>
          <div className='flex items-center gap-3 mt-2'>
            <span className='px-3 py-1 text-sm text-purple-700 bg-purple-100 rounded-full'>
              ${rate}/hour
            </span>
            <span className='flex items-center gap-1 text-sm text-slate-600'>
              <LocationIcon />
              {county}
            </span>
          </div>

          <Button intent='secondary'>
            Apply Now
            <RightArrow />
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default JobListing;
