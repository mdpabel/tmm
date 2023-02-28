import { client } from './apiClient';

interface ApplicationType {
  name: string;
  jobApplicationLetter: string;
  jobId: number;
}

export const applyToJob = async ({
  name,
  jobApplicationLetter,
  jobId,
}: ApplicationType) => {
  const data = client('/api/application', {
    data: {
      name,
      jobApplicationLetter,
      jobId,
    },
    method: 'POST',
  });

  return data;
};

export const updateStatus = async (
  applicationId: number,
  newStatus: string,
  jobId: number
) => {
  const data = client(`/api/application/${applicationId}`, {
    data: { status: newStatus, jobId: jobId },
    method: 'PUT',
  });
  return data;
};
