import SearchIcon from '@/components/icons/SearchIcon';
import { BarSkeleton } from '@/components/Skeletons';
import {
  HeadData,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableRow,
  TableWrapper,
} from '@/components/Table';
import Filter from '@/components/Filter';

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

const ServicesTable = () => {
  return (
    <div className='max-w-5xl pt-24'>
      <Filter />

      <div className='sm:px-6'>
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
              {new Array(10).fill(0).map((_, idx) => (
                <TableRow key={idx}>
                  {new Array(serviceHeader.length)
                    .fill(BarSkeleton)
                    .map((Item, index) => (
                      <TableData key={index}>
                        <Item />
                      </TableData>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
    </div>
  );
};

export default ServicesTable;
