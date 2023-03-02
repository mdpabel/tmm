import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DashboardLayout from '@/layouts/DashboardLayout';

const localizer = momentLocalizer(moment);

const list = [{ start: 1 }, { end: 2 }];

const Scheduled = () => {
  return (
    <div>
      <Calendar
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
