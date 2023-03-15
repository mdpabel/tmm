import React, { useState, useEffect } from 'react';
import Input, { InputWrapper, Select } from './Input';
import { Label } from '@/components/Input';
import { formateDateAndTime } from '@/utils/formateDate';
import Button from './Button';
import RightArrow from './icons/RightArrow';
import { useRouter } from 'next/router';

const initialState = {
  time: new Date().toLocaleString(),
  reservationHours: '2',
};

interface PropTypes {
  serviceHours: number;
  price: number;
  id: number;
}

const ScheduledMove = ({ serviceHours, price, id }: PropTypes) => {
  const [options, setOptions] = useState([
    {
      label: '',
      value: '',
    },
  ]);
  const [state, setState] = useState({
    startTime: new Date().toLocaleString(),
    reservationHours: '' + serviceHours,
  });
  const { startTime, reservationHours } = state;
  const [end, setEnd] = useState('');
  const router = useRouter();

  const servicePrice = (price / serviceHours) * +reservationHours;

  useEffect(() => {
    const endTime = new Date(
      new Date(startTime).getTime() + +reservationHours * 60 * 60 * 1000
    );

    const humanReadableEndTime = formateDateAndTime(endTime);
    setEnd(humanReadableEndTime);
  }, [reservationHours, startTime]);

  useEffect(() => {
    const genOptions = [];
    for (let i = +serviceHours; i <= 24; i++) {
      genOptions.push({
        label: '' + i + ' hours',
        value: '' + i,
      });
    }
    setOptions(genOptions);
  }, [serviceHours]);

  const handleSchedule = () => {
    window.localStorage.setItem(
      'cartService',
      '' +
        JSON.stringify({
          price: servicePrice,
          id,
          startTime,
          reservationHours,
          endTime: new Date(
            new Date(startTime).getTime() + +reservationHours * 60 * 60 * 1000
          ),
        })
    );
    router.push('/order-details');
  };

  return (
    <div className='p-4 space-y-4 border'>
      <h2 className='py-2 text-xl font-semibold'>Schedule your move</h2>
      <InputWrapper>
        <Label htmlFor='start-time'>Start time</Label>
        <Input
          id='start-time'
          focus={true}
          onChange={(e) => setState({ ...state, startTime: e.target.value })}
          value={startTime}
          required={true}
          type='datetime-local'
        />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor='start-time'>Reservation Hours</Label>
        <Select
          required={true}
          options={options}
          onChange={(e) => {
            setState({ ...state, reservationHours: e });
          }}
        />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor='end-time'>End time</Label>
        <div>{end ?? ''}</div>
      </InputWrapper>

      <div>
        <hr className='py-4' />
        <div className='space-y-4 md:flex md:flex-row md:justify-between md:items-center'>
          <h2 className='text-2xl font-semibold'>Total: ${servicePrice}</h2>
          <Button onClick={handleSchedule} type='button'>
            Schedule your move <RightArrow />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduledMove;
