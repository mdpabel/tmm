import { client } from './apiClient';

interface ServiceType {
  county: string;
  disclaimer: string;
  hours: string;
  info: string;
  movers: string;
  name: string;
  imgUrl: string;
  price: string;
}

export const addNewService = async ({
  county,
  disclaimer,
  hours,
  info,
  movers,
  name,
  imgUrl,
  price,
}: ServiceType) => {
  const data = client('/api/service', {
    data: {
      county,
      disclaimer,
      hours,
      info,
      movers,
      name,
      imgUrl,
      price,
    },
    method: 'POST',
  });

  return data;
};

export const getAllData = async () => {
  const data = client('/api/service');

  return data;
};
