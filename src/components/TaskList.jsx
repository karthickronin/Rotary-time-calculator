import React from "react";
import { Link } from "react-router-dom";

const TaskList = ({ tasks }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks added yet!</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>Name:</strong> {task.name}
            </p>
            <Link
              to={`/task/${task.id}`}
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "#2196F3",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
