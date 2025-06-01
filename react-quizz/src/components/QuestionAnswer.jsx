import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import availableQuestions from "../questions.js";
import {useState} from "react";

export default function QuestionAnswer({
                                             index,
                                             onSelectAnswer,
                                             onSkipAnswer})
{

    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null,
    });

    let timer = 150000;

    if (answer.selectedAnswer) {
        timer = 10000;
    }

    if (answer.isCorrect !== null) {
        timer = 20000;
    }

    function handleSelectedAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null,
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: availableQuestions[index].answers[0] === answer,
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 20000);

        }, 10000);

    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if(answer.selectedAnswer) {
        answerState =  'answered';
    }

    return (
        <div id="question">
            <QuestionTimer
                onTimeout= {answer.selectedAnswer === '' ? onSkipAnswer : null}
                key={timer}
                timeout={timer}
                mode={answerState} />
            <h2>{availableQuestions[index].text}</h2>
            <Answers
                selectedAnswer={answer.selectedAnswer}
                answers={availableQuestions[index].answers}
                onSelect={handleSelectedAnswer}
                answerState={answerState}
            />
        </div>
    );
}