// Importar React y ReactDOM
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Home from "./component/home.jsx";

// Componente principal que maneja la lista de tareas
const App = () => {
  const [tasks, setTasks] = useState([]);

  // Crear usuario al cargar el componente por primera vez
  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/user/maurigon89', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([])
    })
      .then(resp => {
        if (!resp.ok) throw new Error("Failed to create user");
        return resp.json();
      })
      .then(data => console.log("Usuario creado: ", data))
      .catch(error => console.error("Error al crear usuario:", error));
  }, []);

  // Obtener las tareas al cargar el componente
  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/user/maurigon89', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        if (!resp.ok) throw new Error("Error al obtener las tareas");
        return resp.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          throw new Error("El formato de las tareas no es correcto");
        }
      })
      .catch(error => console.error("Error al obtener las tareas:", error));
  }, []);

  // Sincronizar las tareas con el servidor
  const syncTasks = (updatedTasks) => {
    fetch('https://playground.4geeks.com/todo/user/maurigon89', {
      method: "PUT",
      body: JSON.stringify(updatedTasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        if (!resp.ok) throw new Error("Error al sincronizar las tareas");
        return resp.json();
      })
      .then(data => console.log("Tareas sincronizadas:", data))
      .catch(error => console.error("Error al sincronizar las tareas:", error));
  };

  // Añadir nueva tarea
  const addTask = (newTask) => {
    const updatedTasks = [...tasks, { label: newTask, done: false }];
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

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);