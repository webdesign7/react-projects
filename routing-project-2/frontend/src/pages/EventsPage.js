import {Await, useLoaderData} from "react-router-dom";
import EventsList from '../components/EventsList';
import {Suspense} from "react";

function EventsPage() {
    const {events} = useLoaderData();

    return <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={events}>
            {(loadedEvents) => <EventsList events={loadedEvents}/>}
        </Await>
    </Suspense>
}


async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        return new Response( JSON.stringify({message: 'Could not fetch events'}), { status: 500});
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export async function loader() {
    return {
        events: loadEvents(),
    };
}

export default EventsPage;