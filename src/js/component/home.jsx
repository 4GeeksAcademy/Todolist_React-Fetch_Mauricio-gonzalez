import React, { useState } from "react";

const Home = ({ tasks, onAddTask, onDeleteTask, onClearTasks }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask({ label: newTask, done: false });
      setNewTask("");
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-center mt-5">Todo List</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Añade una nueva tarea"
          className="form-control my-3"
        />
        <button type="submit" className="btn btn-success mb-3">
          Añadir Tarea
        </button>
      </form>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            {task.label}
            <button className="btn btn-danger" onClick={() => onDeleteTask(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button className="btn btn-danger mt-3" onClick={onClearTasks}>
        Limpiar todas las tareas
      </button>
    </div>
  );
};

export default Home;