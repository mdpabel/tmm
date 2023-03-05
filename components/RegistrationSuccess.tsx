import React from 'react';
import Alert from './Alert';
import { CardWrapper } from './Card';

const RegistrationSuccess = () => {
  return (
    <div className='container w-full max-w-lg'>
      <CardWrapper>
        <Alert intent='success'>
          Thank you for submitting your documents. We have received your
          materials and they are being reviewed by our team. Please note that
          our standard processing time is within 24 hours. You can expect to
          hear back from us soon. We appreciate your patience and look forward
          to assisting you further.
        </Alert>
      </CardWrapper>
    </div>
  );
};

export default RegistrationSuccess;
