import JobListTable from '@/components/JobListsTable';
import DashboardLayout from '@/layouts/DashboardLayout';

const ManageJobs = () => {
  return (
    <div className='w-full py-6'>
      <JobListTable />
    </div>
  );
};

ManageJobs.layout = DashboardLayout;

export default ManageJobs;
