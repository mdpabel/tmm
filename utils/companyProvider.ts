import { client } from './apiClient';

interface CompanyType {
  companyName: string;
  companyInfo: string;
}

export const addNewCompany = async ({
  companyName,
  companyInfo,
}: CompanyType) => {
  const data = client('/api/company', {
    data: {
      companyName,
      companyInfo,
    },
    method: 'POST',
  });

  return data;
};
