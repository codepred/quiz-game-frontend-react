import React, { useState } from "react";

const SingleChoiceQuestion = ({ question, onAnswerSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = selectedAnswer === question.answer;
    onAnswerSubmit({ isCorrect });
  };

  return (
    <form onSubmit={handleSubmit}>
      {question.answers.map((answer) => (
        <label key={answer}>
          <input
            type="radio"
            value={answer}
            checked={selectedAnswer === answer}
            onChange={handleAnswerChange}
          />
          {answer}
        </label>
      ))}
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default SingleChoiceQuestion;
