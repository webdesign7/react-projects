import availableQuestions from "../questions.js";
import {useRef} from "react";

export default function Answers({answers, selectedAnswer, onSelect, answerState}) {

    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            { shuffledAnswers.current.map((answer, index) => {

                const isSelected = selectedAnswer === answer;

                let cssClasses = '';

                if (answerState === 'answered' && isSelected) {
                    cssClasses = 'selected';
                }

                if (( answerState === 'correct' || answerState === 'wrong') && isSelected ) {
                    cssClasses = answerState;
                }

                return (<li className="answer" key={index}>
                    <button disabled={answerState !== ''}
                        className={cssClasses} onClick={() => onSelect(answer)}>{answer}</button>
                </li>);

            }) }
        </ul>
    );
}
