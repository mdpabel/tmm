import { client } from './apiClient';

interface MoverType {
  bio: string;
  mobile: string;
}

export const addNewMover = async ({ bio, mobile }: MoverType) => {
  const data = client('/api/mover', {
    data: {
      bio,
      mobile,
    },
    method: 'POST',
  });

  return data;
};
