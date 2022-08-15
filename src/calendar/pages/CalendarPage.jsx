import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import React, { useEffect, useState } from 'react'
import { localizer, getMessage } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'


export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const { events, setActiveEvent,startLoadingEvents } = useCalendarStore();
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();


  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyevent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyevent? '#347CF7' : '#465660',
      borderRaidus: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {

    setActiveEvent(event);
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px' }}
        messages={getMessage()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <FabDelete />
      <FabAddNew />
      <CalendarModal />
    </>
  )
}
