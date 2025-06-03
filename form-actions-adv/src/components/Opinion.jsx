import { use, useActionState, useOptimistic } from "react";
import { OpinionsContext} from "../store/opinions-context.jsx";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {

  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  const [optimisticVotes, setOptimisticVotes] = useOptimistic(votes,
      (prevVotes, mode) =>(
        mode === "upvote" ? prevVotes + 1 : mode === "downvote" ? prevVotes - 1 : prevVotes
      )
  );


  async function upVoteAction() {
    setOptimisticVotes("upvote");
    await upvoteOpinion(id);
  }

    async  function downVoteAction() {
        setOptimisticVotes("downvote");
      await downvoteOpinion(id);
    }

    const [downVoteFormState, downVoteFormAction, downVoteFormPending ] = useActionState(downVoteAction);
    const [upVoteFormState, upVoteFormAction, upVoteFormPending ] = useActionState(upVoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={upVoteFormAction}
        disabled={upVoteFormPending || downVoteFormPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button formAction={downVoteFormAction}
        disabled={downVoteFormPending || upVoteFormPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
