import React from "react";

export const CalendarEvent = ({icon, text, time}) => {
  return (
    <div className='fc-event-main-frame'>
      <div className="fc-event-title-container">
        <div className="fc-event-title fc-sticky">
          {icon}
          <span className="mx-1">{time}</span>
          <span>{text}</span>
        </div>
      </div>
    </div>
  )
}