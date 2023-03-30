// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DashboardLayout from '@/layouts/DashboardLayout';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { ApplicationType } from '@/types/applicationTypes';
import Title from '@/components/Title';
import Alert from '@/components/Alert';

const localizer = momentLocalizer(moment);

const sum = ({ date, hours }: { date: Date; hours: number }) => {
  let timestamp = new Date(date);
  timestamp.setHours(timestamp?.getHours() + hours);

  let formattedDate = timestamp?.toISOString();
  return new Date(formattedDate);
};

const list = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: false,
    start: new Date(2023, 2, 16, 10, 0),
    end: new Date(2023, 2, 16, 12, 0),
  },
];

interface ScheduledType {
  id: number;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
}

const Scheduled = () => {
  const { data: applications } = useSWR('/api/scheduled', fetcher, {
    revalidateOnMount: true,
  });
  const [eventData, setEventData] = useState({});
  const [schedules, setSchedules] = useState<ScheduledType[]>([]);

  useEffect(() => {
    let formattedSchedules =
      (applications?.data as ApplicationType[])?.forEach((ap, idx) => {
        if (!ap?.order) return;

        return {
          id: idx,
          details: {
            ...ap?.order?.OrderDetails[0],
            reservationHours: ap?.order?.reservationHours,
          },
          title: ap?.order?.OrderDetails[0].loading
            ? 'Loading'
            : '' + ap?.order?.OrderDetails[0].unloading
            ? ' Unloading'
            : '',
          allDay: false,
          start: new Date(ap?.order?.startTime),
          end: sum({
            date: ap?.order?.startTime,
            hours: ap?.order?.reservationHours,
          }),
        };
      }) ?? [];

    if (formattedSchedules[0] === undefined) {
      formattedSchedules = [];
    }

    setSchedules([...formattedSchedules]);
  }, [applications]);

  console.log(schedules);

  return (
    <div>
      <div>
        <Calendar
          onSelectEvent={(event) => setEventData(event)}
          localizer={localizer}
          events={schedules}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
        />
      </div>

      <ul className='pt-10'>
        <Title>Event Details</Title>
        {Object.values(eventData).length !== 0 ? (
          <>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Start Address : {eventData?.details?.startAddress}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              End Address : {eventData?.details?.endAddress}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              City : {eventData?.details?.city}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              State : {eventData?.details?.state}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Zip : {eventData?.details?.zip}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Loading : {eventData?.details?.loading ? 'YES' : 'NO'}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Unloading : {eventData?.details?.unloading ? 'YES' : 'NO'}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Special Items : {eventData?.details?.specialItems}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Reservation Hours : {eventData?.details?.reservationHours}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Number Of Stair Floors : {eventData?.details?.numberOfStairFloors}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Number Of Stair Flights :{' '}
              {eventData?.details?.numberOfStairFlights}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Number Of Stair Dimensions :{' '}
              {eventData?.details?.numberOfStairFlights}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Number Of Rooms : {eventData?.details?.numberOfRooms}
            </li>
            <li className='px-4 py-2 border-b border-gray-200 rounded-t-lg'>
              Notes : {eventData?.details?.notes}
            </li>
          </>
        ) : (
          <>
            <div className='pt-4'></div>
            <Alert intent='warning'>
              {schedules.length > 0
                ? 'Please select an event in order to show the details'
                : 'No event found'}
            </Alert>
          </>
        )}
      </ul>
    </div>
  );
};

Scheduled.layout = DashboardLayout;

export default Scheduled;
