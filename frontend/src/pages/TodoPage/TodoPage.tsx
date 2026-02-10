import ActivePokemonCard from "../../components/ActivePokemonCard/ActivePokemonCard";
import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"
import Timer from "../../components/Timer/Timer";
import classes from "./TodoPage.module.css";
import React, { useState } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import styles from './TodoPage.module.css';
import type { Task } from "../../types/task";

function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Ride a bike", completed: false },
    { id: 2, text: "Buy groceries", completed: true },
  ]);

  const toggleTask = (id: Task["id"]) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: Task["id"]) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const changeTask = (id: Task["id"], text: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text } : t))
    );
  };

  return (
    <div className={classes.todoWrapper}>
      <Header />
      <div className={classes.leftRightWrapper}>
        <Timer/>
        <ActivePokemonCard/>
      </div>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1 className={styles.title}>Todo List</h1>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onChange={changeTask}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoPage;
