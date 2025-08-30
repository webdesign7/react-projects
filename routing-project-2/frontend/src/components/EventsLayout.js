import React from 'react';
import { Outlet } from 'react-router-dom';
import EventsNavigation from './EventsNavigation';

function EventsLayout() {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default EventsLayout;
