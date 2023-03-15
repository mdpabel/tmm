import React, { useMemo } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DashboardLayout from '@/layouts/DashboardLayout';

const localizer = momentLocalizer(moment);

const list = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: false,
    start: new Date(2023, 2, 16, 10, 0),
    end: new Date(2023, 2, 16, 12, 0),
  },
];

const Scheduled = () => {
  return (
    <div>
      <Calendar
        onSelectEvent={(event) => console.log(event)}
        localizer={localizer}
        events={list}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </div>
  );
};

Scheduled.layout = DashboardLayout;

export default Scheduled;
