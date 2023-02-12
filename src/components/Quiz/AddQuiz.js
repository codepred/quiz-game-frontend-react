import React from "react";

const AddQuiz = ({ handleQuizData }) => {
  const [quizName, setQuizName] = React.useState("");
  const [questionNumber, setQuestionNumber] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const quizData = {
      quizName: quizName,
      questionNumber: questionNumber,
    };

    handleQuizData(quizData);
  };

  return (
    <div className="add-quiz">
      <h1>Add a quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
        <input
          type="number"
          value={questionNumber}
          onChange={(e) => setQuestionNumber(+e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddQuiz;
