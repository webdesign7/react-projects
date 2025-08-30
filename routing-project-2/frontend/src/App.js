import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import EventsLayout from './components/EventsLayout';
import HomePage from './pages/HomePage';
import EventsPage, {loader as eventsLoader} from './pages/EventsPage';
import EventDetailPage, {loader as eventDetailLoader} from './pages/EventDetailPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'events',
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader
          },
          {
            path: ':id',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
              },
              {
                path: 'edit',
                element: <EditEventPage />
              }
            ]
          },
          {
            path: 'new',
            element: <NewEventPage />
          },

        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
