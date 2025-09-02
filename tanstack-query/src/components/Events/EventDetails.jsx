import {Link, Outlet, useNavigate, useParams} from 'react-router-dom';

import Header from '../Header.jsx';
import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteEvent, fetchEvent, queryClient} from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import {useState} from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
const params =useParams();

const navigate = useNavigate();

const [isDeleting, setIsDeleting] = useState(false);

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => fetchEvent({signal, id: params.id})
  });

  const {mutate,
    isPending: isPendingDeleting,
    isError: isErrorDeleting,
    error: deleteError
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      })
      navigate('/events');
    }
  })

  function handleDelete() {
    mutate({id: params.id});
  }


  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }


  let content;

  if (isPending) {
    content = (<div className="center">Loading...</div>);
  }

  if (isError) {
    content = (<div className="center">
      <ErrorBlock title="Failed to load event" message={error.info?.message || 'failed to load event'}/>
    </div>)
  }

  if (data) {

    const formattedDate = new Date(data.date).toDateString();

    content = (
        <>
          <header>
            <h1> {data.title}</h1>
            <nav>
              <button onClick={handleStartDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location"> {data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
        </>)
  }

  return (
    <>
    {isDeleting && (<Modal onClose={handleStopDelete}>
        <h2>Are you sure you want to delete this event?</h2>
        <p>This action cannot be undone.</p>


        <div className="form-actions">
          {isPendingDeleting && 'Deleting, please wait...'}
          {!isPendingDeleting && (<>
            <button className="button-text" onClick={handleDelete}>Delete</button>
            <button className="button" onClick={handleStopDelete}>Cancel</button>
          </>)}
          {isErrorDeleting && <ErrorBlock
              title="Failed to delete event"
              message={deleteError.info?.message || 'failed to delete event'}/>}
        </div>

      </Modal>)}

      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
