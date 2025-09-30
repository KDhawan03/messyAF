import React from 'react'
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const Calendar = () => {
  return (
    <div className = 'fixed w-96 h-78 bg-[#e8e4e6] self-start rounded-lg pt-8 top-[300px] '>
      <ReactCalendar />
    </div>
  )
}

export default Calendar