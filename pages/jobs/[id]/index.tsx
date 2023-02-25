import Button from '@/components/Button';
import React from 'react';
import Modal from 'react-modal';
import { Tooltip } from 'react-tooltip';
import prisma from '@/db/postgresql';
import { formateDate } from '@/utils/formateDate';
import { JobType } from '@/types/jobType';
import AppLayout from '@/layouts/AppLayout';
import { CompanyType } from '@/types/compnayTypes';
import ApplyJobForm from '@/components/ApplyToJobForm';
import { useSession } from 'next-auth/react';

interface ParamsType {
  params: {
    id: string;
  };
}
interface JobListingType extends JobType {
  company?: CompanyType;
}

const JobParams = ({ job }: { job: JobListingType }) => {
  const { data: session } = useSession();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  if (!job) {
    return <h2>No job posted yet</h2>;
  }

  const {
    id,
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

        <span
          className='inline-block'
          data-tooltip-id={
            //@ts-ignore
            session && session?.user?.role === 'MOVER' ? '' : 'apply-btn'
          }
        >
          <Button
            //@ts-ignore
            disabled={session && session?.user?.role === 'MOVER' ? false : true}
            onClick={() => {
              setIsOpen(true);
            }}
            intent='secondary'
            size='medium'
          >
            Apply Now
          </Button>
        </span>
        {
          // @ts-ignore
          session && session?.user?.role !== 'MOVER' && (
            <Tooltip
              id='apply-btn'
              place='top'
              content='Only movers can apply to the job'
            />
          )
        }

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
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <ApplyJobForm jobId={id} />
        </Modal>
      </div>
    </div>
  );
};

JobParams.layout = AppLayout;

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

  if (!data) {
    return {
      notFound: true,
    };
  }

  const job = JSON.parse(JSON.stringify(data));

  return {
    props: { job },
    revalidate: 1,
  };
}

export default JobParams;
