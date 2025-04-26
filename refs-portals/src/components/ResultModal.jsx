import {useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

export default function ResultModal({ref, targetTime, timeRemaining, resetTime}) {
    const dialog = useRef();

    const loser = timeRemaining <= 0;
    const formattedTime = (timeRemaining / 1000).toFixed(2);
    const score = Math.abs(targetTime - formattedTime);

    useImperativeHandle(ref, () => {
        return {
            showModal() {
                dialog.current.showModal();
            },
        };
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal">

            {loser && <h2>You lost</h2>}
            {!loser && <p>Your score was: {score}</p>}
            <p>
                The target time was {targetTime} second
            </p>
            <p>
                You stopped the timer with {formattedTime} seconds left
            </p>
            <p>
                <form method="dialog">
                    <button onSubmit={resetTime}>
                        Close
                    </button>
                </form>

            </p>
        </dialog>,
        document.getElementById("modal")
    );
}