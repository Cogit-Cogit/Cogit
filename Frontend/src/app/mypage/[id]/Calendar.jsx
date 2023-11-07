import React, { useRef } from 'react';
import TUICalendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const calendars = [
  {
    id: '1',
    name: 'My Calendar',
    color: '#ffffff',
    bgColor: '#FFFFFF',
    dragBgColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
];

const initialEvents = [
  {
    id: '1',
    calendarId: 'cal1',
    title: 'Group 1',
    category: 'allday',
    start: '2023-11-06',
    end: '2023-11-07',
    color: 'white',
    backgroundColor: '#B02BFF',
  },
  {
    id: '2',
    calendarId: 'cal1',
    title: 'Group 2',
    category: 'allday',
    start: '2023-11-09',
    end: '2023-11-11',
    color: 'white',
    backgroundColor: '#FF127C',
  },
  {
    id: '3',
    calendarId: 'cal1',
    title: 'Group 3',
    category: 'allday',
    start: '2023-11-07',
    end: '2023-11-12',
    color: 'white',
    backgroundColor: '#FFBB19',
  },
  {
    id: '4',
    calendarId: 'cal1',
    title: 'Group 4',
    category: 'allday',
    start: '2023-10-31',
    end: '2023-11-07',
    color: 'white',
    backgroundColor: '#ADE600',
  },
  {
    id: '5',
    calendarId: 'cal1',
    title: 'Group 5',
    category: 'allday',
    start: '2023-10-31',
    end: '2023-11-07',
    color: 'white',
    backgroundColor: '#00A6FF',
  },
];

function Calendar() {
  const cal = useRef(null);

  const monthOptions = {
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    startDayOfWeek: 0,
    narrowWeekend: false,
    visibleWeeksCount: 4,
    // isAlways6Weeks: true,
    visibleEventCount: 5,
  };

  return (
    <div>
      <TUICalendar
        ref={cal}
        height="79vh"
        view="month"
        month={monthOptions}
        useCreationPopup={false}
        useDetailPopup={false}
        calendars={calendars}
        events={initialEvents}
        isReadOnly={true}
      />
    </div>
  );
}

export default Calendar;
