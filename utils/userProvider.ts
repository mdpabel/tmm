import { client } from './apiClient';

export const updatePassword = async ({
  newPass,
  oldPass,
}: {
  newPass: string;
  oldPass: string;
}) => {
  const data = client('/api/user', {
    data: {
      newPass,
      oldPass,
    },
    method: 'PUT',
  });

  return data;
};
