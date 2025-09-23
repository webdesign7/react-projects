import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {router} from "next/client";

export default function NewMeetup() {

    function addMeetupHandler(data) {
        const response = fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response);

        router.push('/');
    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}