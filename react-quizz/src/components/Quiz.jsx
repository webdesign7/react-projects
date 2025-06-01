import availableQuestions from "../questions.js";
import {useCallback, useState} from "react";
import QuestionAnswer from "./QuestionAnswer.jsx";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;


    const handleSelectAnswer = useCallback( function handleSelectAnswer(answer) {

        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, answer];
        });

    }, []);



    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (userAnswers.length === availableQuestions.length) {
        return (
            <section id="quiz">
                <h2>Quiz Finished!</h2>
                <p>Thank you for participating!</p>
            </section>
        );
    }

    return (
        <section id="quiz">
            <QuestionAnswer
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
                key={activeQuestionIndex}
                index={activeQuestionIndex}
            />
        </section>
    );
}