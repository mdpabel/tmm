import {
  HeadData,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableRow,
  TableWrapper,
} from './Table';
import Title from './Title';

const columns = [];

const JobListTable = () => {
  return (
    <>
      <div className='w-full space-y-8 sm:px-6'>
        <Title>Manage jobs</Title>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <HeadData>Job Position</HeadData>
                <HeadData>Rate</HeadData>
                <HeadData>status</HeadData>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableData className='text-center'>mover</TableData>
                <TableData className='text-center'>$20</TableData>
                <TableData className='text-center'>Pending</TableData>
              </TableRow>
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
    </>
  );
};

export default JobListTable;
