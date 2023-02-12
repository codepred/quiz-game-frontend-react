import React from "react";

const QuestionList = ({ questions, onQuestionDelete, onQuestionEdit }) => {
  return (
    <ul>
      {questions.map((question, index) => (
        <li key={index}>
          <h3>{question.text}</h3>
          {question.type === "single" ||
          question.type === "multiple" ||
          question.type === "list" ? (
            <p>Answers: {question.answers}</p>
          ) : null}
          {question.type === "short" || question.type === "fill" ? (
            <p>Answer: {question.answer}</p>
          ) : null}
          {question.type === "sort" || question.type === "match" ? (
            <p>
              Items:
              {question.items.map((item, index) => (
                <div key={index}>
                  <p>{item.text}</p>
                  {question.type === "match" ? (
                    <p>Match: {item.match}</p>
                  ) : null}
                </div>
              ))}
            </p>
          ) : null}
          <button onClick={() => onQuestionDelete(index)}>Delete</button>
          <button onClick={() => onQuestionEdit(index, question)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default QuestionList;
