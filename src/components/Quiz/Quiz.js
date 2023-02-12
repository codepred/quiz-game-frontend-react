import React, { useState } from "react";
import SingleChoiceQuestion from "./SingleChoiceQuestion";

const Quiz = ({ questions, settings, onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSubmit = (answer) => {
    setAnswers([...answers, answer]);

    if (answer.isCorrect) {
      setScore(score + settings.pointsPerQuestion);
    }

    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onQuizEnd(score);
    }
  };

  return (
    <div>
      <h2>{currentQuestion.text}</h2>
      {currentQuestion.type === "single" ? (
        <SingleChoiceQuestion
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : null}
      {/* {currentQuestion.type === "multiple" ? (
        <MultipleChoiceQuestion
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : null}
      {currentQuestion.type === "truefalse" ? (
        <TrueFalseQuestion
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : null}
      {currentQuestion.type === "short" ? (
        <ShortAnswerQuestion
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : null}
      {currentQuestion.type === "list" ? (
        <ListSelectionQuestion
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : null}
      {currentQuestion.type === "fill" ? (
        <FillInTheBlankQuestion
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : null}
      {currentQuestion.type === "sort" ? (
        <SortQuestion
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : null}
      {currentQuestion.type === "match" ? (
        <MatchQuestion
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : null} */}
    </div>
  );
};

export default Quiz;
