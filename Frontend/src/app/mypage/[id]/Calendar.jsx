import React, { useRef, useMemo } from 'react';
import TUICalendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { useMemberState } from '@/app/MemberContext';

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

function Calendar({ scheduleList }) {
  const cal = useRef(null);

  const events = scheduleList

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
        events={events}
        isReadOnly={true}
      />
    </div>
  );
}

export default Calendar;
