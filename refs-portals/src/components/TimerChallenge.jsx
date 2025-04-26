import {useState, useRef} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsRunning = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.showModal();
    }

    function resetTimer() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(
            () => {
                setTimeRemaining((prevTime) => prevTime - 10);
            },
            10
        )
    }

    function handleStop() {
        dialog.current.showModal();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} resetTime={resetTimer} />
        <section className="challenge">
        <h2>{title}</h2>

        <p className='challenge-time'>
            {targetTime} second {targetTime === 1 ? "": "s"}
        </p>
        <p>
            <button onClick={timerIsRunning ? handleStop : handleStart}>
                {timerIsRunning ? "Stop" : "Start"}
            </button>
        </p>
            <p className={timerIsRunning ? "active" : undefined}>
                {timerIsRunning ? "Time is running" : "Challenge not started"}
            </p>
        </section>
        </>
    );
}