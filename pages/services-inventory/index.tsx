import prisma from '@/db/postgresql';
import Image from 'next/image';
import Filter from '@/components/Filter';
import DeleteIcon from '@/components/icons/DeleteIcon';
import EditIcon from '@/components/icons/EditIcon';
import { ServiceType } from '@/types/serviceType';

import {
  HeadData,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableRow,
  TableWrapper,
} from '@/components/Table';
import Title from '@/components/Title';
import DashboardLayout from '@/layouts/DashboardLayout';

const serviceHeader = [
  'packageImage',
  'name',
  'county',
  'price',
  'movers',
  'hours',
  'edit',
  'delete',
];

export async function getServerSideProps() {
  const res = await prisma.service.findMany();
  const services = JSON.parse(JSON.stringify(res));

  return { props: { services } };
}

const ServiceInventory = ({ services }: { services: ServiceType[] }) => {
  return (
    <div className='p-6 mx-auto'>
      <Filter />

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                {serviceHeader.map((item, idx) => (
                  <HeadData key={idx}>{item}</HeadData>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map(
                ({
                  id,
                  serviceName,
                  servicePrice,
                  serviceMovers,
                  serviceHours,
                  serviceCounty,
                  serviceImg,
                }) => (
                  <TableRow key={id}>
                    <TableData>
                      <Image
                        width={70}
                        height={70}
                        src={serviceImg}
                        alt={serviceName}
                      />
                    </TableData>
                    <TableData>{serviceName}</TableData>
                    <TableData>{serviceCounty}</TableData>
                    <TableData>{servicePrice}</TableData>
                    <TableData>{serviceMovers}</TableData>
                    <TableData>{serviceHours}</TableData>
                    <TableData>
                      <EditIcon />
                    </TableData>
                    <TableData>
                      <DeleteIcon />
                    </TableData>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
    </div>
  );
};

ServiceInventory.layout = DashboardLayout;

export default ServiceInventory;
