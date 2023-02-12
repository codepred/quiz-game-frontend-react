import React, { useEffect, useReducer, useMemo, useState } from "react";
import Quiz from "./Quiz";
import { useNavigate } from "react-router-dom";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions,
      };
    case "SET_SETTINGS":
      return {
        ...state,
        settings: action.settings,
      };
    case "SET_QUIZ":
      return {
        ...state,
        quiz: action.quiz,
      };
    case "DELETE_QUESTION":
      const newQuestions = [...state.questions];
      newQuestions.splice(action.index, 1);
      return {
        ...state,
        questions: newQuestions,
      };
    case "EDIT_QUESTION":
      const editedQuestions = [...state.questions];
      editedQuestions[action.index] = action.question;
      return {
        ...state,
        questions: editedQuestions,
      };
    default:
      return state;
  }
};

const GameQuestion = () => {


    const [users, setUsers] = useState([])

    const fetchData = async () => {
        const response = await fetch("http://localhost:3000/questions/next")
        const data = await response.json()
        console.log(data[0].question)
        console.log(data[0].answerArray)
        setUsers(data)
      }
    
        useEffect(() => {
            fetchData()
          }, [])


  const navigate = useNavigate();
  var answer = "";
  const [state, dispatch] = useReducer(quizReducer, {
    questions: [],
    answer: "",
    settings: {},
    quiz: null,
  });

  const update = () =>{
    answer = document.getElementById("answer").value;
    
    // add answer
    var response = fetch("http://localhost:3000/answer/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({
        
        question: users[0].question,
        answer: [answer],

        login: localStorage.getItem("login")
      }),
    }).then(console.log(response))
  }




  const handleQuizEnd = (score) => {
    dispatch({ type: "SET_QUIZ", quiz: null });
    alert(`You scored ${score} points!`);
  };

  const handleQuestionDelete = (index) => {
    dispatch({ type: "DELETE_QUESTION", index: index });
  };

  const handleQuestionEdit = (index, question) => {
    dispatch({ type: "EDIT_QUESTION", index: index, question: question });
  };

  const quizContent = useMemo(() => {

 

    return state.quiz ? (
      <Quiz
        questions={state.quiz}
        settings={state.settings}
        onQuizEnd={handleQuizEnd}
      />
    ) : (
      <>
        <h1>Oto kolejne pytanie</h1>
        {
            users.map((user) => (
                <tr>
                    <td>{user.question}</td>
                    <td>{user.answerArray}</td>

                </tr>
            ))
        }
        <form onSubmit={update}>
        <label>
            Odpowiedz
            <input
                id="answer"
                type="text"
                name="text"
            />
          </label>
        <button>Odpowiedz</button>
        </form>
      </>
    );
  }, [state.quiz, state.questions, state.settings]);

  return <div>{quizContent}</div>;
};

export default GameQuestion;
