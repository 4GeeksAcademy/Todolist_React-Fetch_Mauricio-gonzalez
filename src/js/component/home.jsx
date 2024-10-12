import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Home from "./component/home";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Obtener las tareas del servidor al cargar la app
  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/user/maurigon89', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => setTasks(data))
    .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  // Sincronizar tareas con el servidor
  const syncTasks = (updatedTasks) => {
    fetch('https://playground.4geeks.com/todo/user/maurigon89', {
      method: "PUT",
      body: JSON.stringify(updatedTasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => console.log("Tasks synced:", data))
    .catch(error => console.error("Error syncing tasks:", error));
  };

  // Añadir tarea
  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    syncTasks(updatedTasks);
  };

  // Eliminar tarea
  const deleteTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
    syncTasks(updatedTasks);
  };

  // Limpiar todas las tareas
  const clearTasks = () => {
    setTasks([]);
    syncTasks([]);  
  };

  return <Home tasks={tasks} onAddTask={addTask} onDeleteTask={deleteTask} onClearTasks={clearTasks} />;
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);