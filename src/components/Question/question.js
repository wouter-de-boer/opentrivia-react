import React from 'react';
import './question.css';

const Question = (props) => {
    const { question, setAnswer } = props

    const renderHTML = (tag, rawHTML) => React.createElement(tag, { dangerouslySetInnerHTML: { __html: rawHTML } });

    return (
        <div className="question">

            {renderHTML("h3", question.question)}
            {question.correctAnswer && (<strong>Correct answer is: {question.correctAnswer}</strong>)}

            {question.answers.map((answer, index) => {
                return answer != null ?
                    <div className={`answer ${question.answered?question.correct? "answer-correct" : "answer-wrong":""}`} key={index}>
                        <label><input id={answer} name={question.question} type="radio" value={answer} onChange={(e) => setAnswer(question.question, e.target.value )} />
                            {renderHTML("span", answer)}</label>
                    </div> : ""

            })}
        </div>
    );
}

export default Question;