import { JobType } from '@/types/jobType';
import { client } from './apiClient';

interface CreateNewJobType {
  position: string;
  rate: number;
  title: string;
  county: string;
  description: string;
}

export const createNewJob = async ({
  position,
  rate,
  title,
  county,
  description,
}: CreateNewJobType) => {
  const data = client('/api/job', {
    data: { position, rate, title, county, description },
    method: 'POST',
  });

  return data;
};
