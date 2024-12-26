import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../src/index.css";
import "../../src/i18n"; // Import i18n configuration

const TaskPage = () => {
  const { taskId } = useParams();
  const { t, i18n } = useTranslation(); // useTranslation hook for translation

  const [task, setTask] = useState(null);
  const switchLanguage = () => {
    const nextLanguage =
      i18n.language === "en" ? "ta" : i18n.language === "ta" ? "hi" : "en";
    i18n.changeLanguage(nextLanguage);
  };

  const getButtonLabel = () => {
    if (i18n.language === "en") return "தமிழ்";
    if (i18n.language === "ta") return "हिंदी";
    return "English";
  };

  // Load task data on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const currentTask = savedTasks.find((t) => t.id === parseInt(taskId));
    setTask(currentTask);
  }, [taskId]);

  // Function to update task in state and localStorage
  const updateTask = (updatedTask) => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = savedTasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask(updatedTask); // Update state with the latest task
  };

  const setCurrentTime = () => new Date().toTimeString().slice(0, 5); // HH:MM

  const addTimePeriod = () => {
    const updatedTask = {
      ...task,
      timePeriods: [
        ...task.timePeriods,
        { enterTime: "", exitTime: "", elapsedTime: "", wages: 0 },
      ],
    };
    updateTask(updatedTask); // Save changes dynamically
  };

  const calculateWages = (index) => {
    const updatedTask = { ...task };
    const period = updatedTask.timePeriods[index];

    if (!period.enterTime || !period.exitTime) {
      alert(t("enterTime") + " & " + t("exitTime"));
      return;
    }

    const start = new Date(`2024-01-01T${period.enterTime}`);
    const end = new Date(`2024-01-01T${period.exitTime}`);

    if (end < start) {
      alert(t("exitTime") + " must be later than " + t("enterTime"));
      return;
    }

    const diffInHours = (end - start) / 3600000; // Milliseconds to hours
    period.elapsedTime = `${Math.floor(diffInHours)} hours, ${Math.round(
      (diffInHours % 1) * 60
    )} minutes`;
    period.wages = (diffInHours * 1200).toFixed(2); // Default wage rate

    updatedTask.totalWages = updatedTask.timePeriods.reduce(
      (total, p) => total + parseFloat(p.wages || 0),
      0
    );

    updatedTask.totalTime = calculateTotalTime(updatedTask); // Recalculate total time
    updateTask(updatedTask); // Save changes dynamically
  };

  // Function to calculate total time for all time periods in a task
  const calculateTotalTime = (task) => {
    let totalMinutes = 0;

    task.timePeriods.forEach((period) => {
      if (period.enterTime && period.exitTime) {
        const start = new Date(`2024-01-01T${period.enterTime}`);
        const end = new Date(`2024-01-01T${period.exitTime}`);
        totalMinutes += (end - start) / 60000; // Convert milliseconds to minutes
      }
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hours, ${minutes} minutes`;
  };

  if (!task) return <p>{t("loading")}</p>;

  return (
    <div className="task-container">
      <h1 className="task-title">
        {t("taskDetails")} {task.name}
      </h1>
      {/* Language toggle button */}
      <button className="language-btn" onClick={switchLanguage}>
        {getButtonLabel()}
      </button>

      {task.timePeriods.map((period, index) => (
        <div key={index} className="time-period-container">
          <p>
            {t("enterTime")}:{" "}
            <input
              type="time"
              value={period.enterTime}
              onChange={(e) => {
                const updatedTask = { ...task };
                updatedTask.timePeriods[index].enterTime = e.target.value;
                updateTask(updatedTask); // Save changes dynamically
              }}
            />
            <button
              className="set-time-btn"
              onClick={() => {
                const updatedTask = { ...task };
                updatedTask.timePeriods[index].enterTime = setCurrentTime();
                updateTask(updatedTask); // Save changes dynamically
              }}
            >
              {t("setCurrentTime")}
            </button>
          </p>
          <p>
            {t("exitTime")}:{" "}
            <input
              type="time"
              value={period.exitTime}
              onChange={(e) => {
                const updatedTask = { ...task };
                updatedTask.timePeriods[index].exitTime = e.target.value;
                updateTask(updatedTask); // Save changes dynamically
              }}
            />
            <button
              className="set-time-btn"
              onClick={() => {
                const updatedTask = { ...task };
                updatedTask.timePeriods[index].exitTime = setCurrentTime();
                updateTask(updatedTask); // Save changes dynamically
              }}
            >
              {t("setCurrentTime")}
            </button>
          </p>
          <button
            className="calculate-btn"
            onClick={() => calculateWages(index)}
          >
            {t("calculate")}
          </button>
          {period.elapsedTime && (
            <p>
              {t("elapsedTime")}: {period.elapsedTime}
            </p>
          )}
          {period.wages > 0 && (
            <p>
              {t("wages")}: ₹{period.wages}
            </p>
          )}
        </div>
      ))}

      <div className="totals">
        <p>
          <strong>{t("totalTime")}:</strong>{" "}
          {task.totalTime || "0 hours, 0 minutes"}
        </p>
        <p>
          <strong>{t("totalWages")}:</strong> ₹{task.totalWages || 0}
        </p>
        <button className="add-period-btn" onClick={addTimePeriod}>
          {t("addTimePeriod")}
        </button>
      </div>

      <Link to="/" className="back-home-link">
        {t("backHome")}
      </Link>
    </div>
  );
};

export default TaskPage;
