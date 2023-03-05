import { client } from './apiClient';

interface MoverType {
  idCardImage: string;
  userId: string;
  drivingLicense: string;
}

export const addNewMover = async ({
  idCardImage,
  drivingLicense,
  userId,
}: MoverType) => {
  const data = client('/api/mover', {
    data: {
      drivingLicense,
      userId,
      idCardImage,
    },
    method: 'POST',
  });

  return data;
};
