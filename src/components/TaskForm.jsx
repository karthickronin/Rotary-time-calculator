import React, { useState } from "react";

const TaskForm = ({ setTasks }) => {
  const [personName, setPersonName] = useState("");

  const addTask = () => {
    if (!personName) {
      alert("Please enter a person name.");
      return;
    }

    const newTask = {
      id: Date.now(), // Unique ID
      name: personName,
      timePeriods: [],
      totalElapsedTime: 0,
      totalWages: 0,
      wageRate: 1200,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setPersonName("");
  };

  return (
    <div>
      <label>Person Name: </label>
      <input
        type="text"
        value={personName}
        onChange={(e) => setPersonName(e.target.value)}
      />
      <button
        onClick={addTask}
        style={{
          marginLeft: "10px",
          padding: "5px 10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
