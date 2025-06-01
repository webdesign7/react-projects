import HeaderImage from '../assets/quiz-logo.png';
import Quiz from "./Quiz.jsx";

export default function Header() {
    return (
        <header >
            <img src={HeaderImage}  alt="Quizz"/>
            <h1>The quiz</h1>
        </header>

    );
}