import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../src/index.css"; // Importing external CSS file
import "../../src/i18n"; // Import i18n configuration


const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [personName, setPersonName] = useState("");
  const { t, i18n } = useTranslation(); // useTranslation hook for translation
  const switchLanguage = () => {
    const nextLanguage =
      i18n.language === 'en' ? 'ta' : i18n.language === 'ta' ? 'hi' : 'en';
    i18n.changeLanguage(nextLanguage);
  };

  const getButtonLabel = () => {
    if (i18n.language === 'en') return 'தமிழ்';
    if (i18n.language === 'ta') return 'हिंदी';
    return 'English';
  };
  
  

  // Fetch tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Add a new task
  const addTask = () => {
    if (!personName.trim()) {
      alert("Please enter a name!");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: personName,
      timePeriods: [],
      totalWages: 0,
      totalTime: "0 hours, 0 minutes", // Initialize with default time
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setPersonName("");

    
  };
  

  return (
    <div className="home-container">
      <h1 className="title">{t("taskDetails")}</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-name"
          placeholder={t("enterPersonName")}
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
        <button className="add-task-button" onClick={addTask}>{t("add")}</button>
      </div>
        {/* Language toggle button */}
       <div>
       <button className="language-btn" onClick={switchLanguage}>
      {getButtonLabel()}
    </button>
       </div>

      <div className="task-list">
        <h2 className="task-heading">{t("tasks")}</h2>
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <p className="task-info">
              <strong>{t("name")}:</strong> {task.name}
            </p>
            <p className="task-info">
              <strong>{t("totalTime")}:</strong> {task.totalTime || "0 hours, 0 minutes"}
            </p>
            <p className="task-info">
              <strong>{t("totalWages")}:</strong> ₹{task.totalWages || 0}
            </p>
            <Link to={`/task/${task.id}`} className="view-details-link">
              {t("viewDetails")}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
