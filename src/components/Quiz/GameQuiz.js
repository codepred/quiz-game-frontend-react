import React, { useReducer, useMemo } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import SettingsForm from "./SettingsForm";
import QuestionGlobalList from "./QuestionGlobalList";
import QuestionAllList from "./QuestionAllList";
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

const GameQuiz = () => {
  const navigate = useNavigate();
  var nick = "";
  const [state, dispatch] = useReducer(quizReducer, {
    questions: [],
    nick: "",
    settings: {},
    quiz: null,
  });

  const update = () =>{
    nick = document.getElementById("nick").value;
    
    // create user
    var response = fetch("http://localhost:3000/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({
        login:nick,
        password: "password"
      }),
    }).then(response)

    localStorage.setItem("login", nick)

    // reset questions
    var response = fetch("http://localhost:3000/question/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({
      }),
    }).then(response)
    navigate("/user-panel/gamequestion");

    console.log(nick)
  }


  const handleSettingsSubmit = (settings) => {
    dispatch({ type: "SET_SETTINGS", settings: settings });
  };

  const handleQuizStart = () => {
    nick = document.getElementById("nick").value;
    console.log(nick)
    console.log('zaczynam quizzzzzz!!!')

    dispatch({ type: "SET_QUIZ", quiz: state.questions });
  };

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
        <h1>Witamy w grze QUIZ!</h1>
        <br>
        </br>
        <br>
        </br>
        <form onSubmit={update}>
        <label>
            User nick
            <input
                id="nick"
                type="text"
                name="text"
            />
          </label>
        <button>Start Quiz</button>
        </form>
      </>
    );
  }, [state.quiz, state.questions, state.settings]);

  return <div>{quizContent}</div>;
};

export default GameQuiz;
