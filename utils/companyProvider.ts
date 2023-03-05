import { client } from './apiClient';

export interface CompanyType {
  companyName: string;
  idCardImage: string;
  ein: string;
  sole: boolean;
  businessLicense: string;
  userId: string;
}

export const addNewCompany = async ({
  idCardImage,
  ein,
  companyName,
  businessLicense,
  sole,
  userId,
}: CompanyType) => {
  const data = client('/api/company', {
    data: {
      idCardImage,
      ein,
      companyName,
      businessLicense,
      sole,
      userId,
    },
    method: 'POST',
  });

  return data;
};
