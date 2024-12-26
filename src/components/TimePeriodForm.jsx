import React, { useState } from "react";

const TimePeriodForm = ({ task, updateTask }) => {
  const [enterTime, setEnterTime] = useState("");
  const [exitTime, setExitTime] = useState("");

  const addTimePeriod = () => {
    const newPeriod = {
      enterTime,
      exitTime,
      elapsedTime: "",
      wages: 0,
    };

    const updatedTask = { ...task, timePeriods: [...task.timePeriods, newPeriod] };
    updateTask(updatedTask);

    setEnterTime("");
    setExitTime("");
  };

  return (
    <div>
      <h2>Time Periods</h2>
      {task.timePeriods.length === 0 ? (
        <p>No time periods added yet!</p>
      ) : (
        task.timePeriods.map((period, index) => (
          <div key={index}>
            <p>
              <strong>Enter Time:</strong> {period.enterTime || "Not Set"}
            </p>
            <p>
              <strong>Exit Time:</strong> {period.exitTime || "Not Set"}
            </p>
          </div>
        ))
      )}
      <div>
        <label>Enter Time: </label>
        <input
          type="time"
          value={enterTime}
          onChange={(e) => setEnterTime(e.target.value)}
        />
      </div>
      <div>
        <label>Exit Time: </label>
        <input
          type="time"
          value={exitTime}
          onChange={(e) => setExitTime(e.target.value)}
        />
      </div>
      <button
        onClick={addTimePeriod}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Time Period
      </button>
    </div>
  );
};

export default TimePeriodForm;
