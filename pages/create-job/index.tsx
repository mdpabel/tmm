import CreateNewJob from '@/components/CreateNewJobForm';
import DashboardLayout from '@/layouts/DashboardLayout';

const AddNewJob = () => {
  return (
    <div className='w-full'>
      <CreateNewJob />
    </div>
  );
};

AddNewJob.layout = DashboardLayout;

export default AddNewJob;
