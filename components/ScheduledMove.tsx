import React, { useState, useEffect } from 'react';
import Input, { InputWrapper, Select } from './Input';
import { Label } from '@/components/Input';
import { formateDateAndTime } from '@/utils/formateDate';

const initialState = {
  time: new Date().toString(),
  reservationHours: '2',
};

const ScheduledMove = ({ serviceHours }: { serviceHours: number }) => {
  const [options, setOptions] = useState([
    {
      label: '',
      value: '',
    },
  ]);
  const [state, setState] = useState({ ...initialState });
  const { time, reservationHours } = state;
  const [end, setEnd] = useState('');

  useEffect(() => {
    const endTime = new Date(
      new Date(time).getTime() + +reservationHours * 60 * 60 * 1000
    );

    const humanReadableEndTime = formateDateAndTime(endTime);
    setEnd(humanReadableEndTime);
  }, [reservationHours, time]);

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

  return (
    <div className='p-4 space-y-4 border'>
      <h2 className='py-2 text-xl font-semibold'>Schedule your move</h2>
      <InputWrapper>
        <Label htmlFor='start-time'>Start time</Label>
        <Input
          id='start-time'
          focus={true}
          onChange={(e) => setState({ ...state, time: e.target.value })}
          value={time}
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
    </div>
  );
};

export default ScheduledMove;
