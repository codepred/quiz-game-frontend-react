import React, { useState } from "react";

const QuestionForm = ({ onQuestionSubmit }) => {
  const [questionType, setQuestionType] = useState(null);
  const [question, setQuestion] = useState({});

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    if (name === "answers") {
      setQuestion({ ...question, [name]: value.split(",") });
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onQuestionSubmit({ type: questionType, ...question });
    setQuestion({});
    setQuestionType(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question Type:
        <select value={questionType} onChange={handleQuestionTypeChange}>
          <option value="">Select a type</option>
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
          <option value="truefalse">True/False</option>
          <option value="short">Short Answer</option>
          <option value="list">List Selection</option>
          <option value="fill">Fill in the Blank</option>
          <option value="sort">Sort</option>
          <option value="match">Match</option>
        </select>
      </label>
      {questionType && (
        <>
          <label>
            Question Text:
            <input
              type="text"
              name="text"
              value={question.text || ""}
              onChange={handleQuestionChange}
            />
          </label>
          {questionType === "single" ||
          questionType === "multiple" ||
          questionType === "list" ? (
            <label>
              Answers:
              <input
                type="text"
                name="answers"
                value={question.answers || ""}
                onChange={handleQuestionChange}
              />
            </label>
          ) : null}
          {questionType === "truefalse" ? (
            <label>
              Answer:
              <select
                name="answer"
                value={question.answer || ""}
                onChange={handleQuestionChange}
              >
                <option value="">Select an answer</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </label>
          ) : null}
          <input type="submit" value="Submit" />
        </>
      )}
    </form>
  );
};

export default QuestionForm;
