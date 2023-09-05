import React, { useEffect, useState } from 'react';

import './App.css';
import Question from './components/Question/question'
import Button from './components/Button/button'

const App = () => {

    const [questions, setQuestions] = useState()
    const [loading, setLoading] = useState(true)

    const [answers, setAnswers] = useState([])

    useEffect(() => {
        //fetch('http://18.196.113.223:8080/questions', {credentials: "include"})
        fetch('http://localhost:8080/questions', {credentials: "include"})
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setQuestions(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);


    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="App">
            {questions.map(question => {
                return <Question key={question.id} question={question} setAnswer={(question, answer) => {

                    answers.push({ question: question, answer: answer });
                    setAnswers(answers)
                }} />
            })}
            <Button label="Check answers" onClick={() => {
                // fetch('http://18.196.113.223:8080/checkanswers', {
                    fetch('http://localhost:8080/checkanswers', {                    
                    credentials: "include",
                    method: 'POST',
                    body: JSON.stringify(answers),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((checkedAnswers) => {
                        checkedAnswers.map((checkedAnswer) => {
                            questions.forEach(question => {
                                if (question.question === checkedAnswer.question) {
                                    question.correct = checkedAnswer.correct;
                                    question.answered = true;
                                    question.correctAnswer = checkedAnswer.correctAnswer;
                                }
                            })

                        })
                        setQuestions([...questions]);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }} />
        </div>
    );
}

export default App;