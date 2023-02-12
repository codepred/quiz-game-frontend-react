import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GameQuestion from "./components/Quiz/GameQuestion.js"
import Login from "./components/Login/Login";
import UserPanel from "./components/UserPanel/UserPanel";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import QuizGame from "./components/Quiz/QuizGame";
import GameQuiz from "./components/Quiz/GameQuiz"
import { UserLoginContext } from "./components/LoginContext/LoginContext";
import { Button, Result } from "antd";
import "./App.css";

const App = () => {
  const [authenticated, isAuthenticated] = useState(false);
  const [admin, isAdmin] = useState(false);

  return (
    <>
      <UserLoginContext.Provider
        value={{ authenticated, isAuthenticated, admin, isAdmin }}
      >
        {admin === false ? (
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/user-panel"
                element={authenticated ? <UserPanel /> : <Navigate to="/" />}
              >
                <Route path="game" element={<GameQuiz />} />
                <Route path="gamequestion" element={<GameQuestion />} />
              </Route>
              <Route
                path="*"
                element={
                  <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                      <Button
                        type="primary"
                        onClick={() => (window.location = "/")}
                      >
                        Back Home
                      </Button>
                    }
                  />
                }
              />
            </Routes>
          </Router>
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/user-panel-admin"
                element={authenticated ? <AdminPanel /> : <Navigate to="/" />}
              >
                <Route path="quiz" element={<QuizGame />} />
              </Route>
              <Route
                path="*"
                element={
                  <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                      <Button
                        type="primary"
                        onClick={() => (window.location = "/")}
                      >
                        Back Home
                      </Button>
                    }
                  />
                }
              />
            </Routes>
          </Router>
        )}
      </UserLoginContext.Provider>
    </>
  );
};

export default App;
