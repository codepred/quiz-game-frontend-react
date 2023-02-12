import React from "react";

const Dashboard = ({ handleQuizData }) => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={() => handleQuizData("")}>Create a new quiz</button>
    </div>
  );
};

export default Dashboard;
