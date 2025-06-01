import {useEffect, useState} from "react";

export default function QuestionTimer({timeout, onTimeout, mode}) {

    const [timeLeft, setTimeLeft] = useState(timeout);

    useEffect(() => {
        console.log('setTimeout', timeLeft);
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [onTimeout, timeout]);

    useEffect(() => {

        console.log('setInterval', timeLeft);

        const interval = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        };

    }, []);

    return <progress id="question-time" max={timeout} className={mode} value={timeLeft} />;
}