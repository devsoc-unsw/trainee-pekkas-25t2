import React from "react";
import styles from "./TaskCard.module.css";
import trashIcon from "../../assets/trash.svg";
import type { Task } from "../../types/task";

type Props = {
  task: Task;
  onToggle: (id: Task["id"]) => void;
  onDelete: (id: Task["id"]) => void;
  onChange: (id: Task["id"], text: string) => void;
};

export default function TaskCard({ task, onToggle, onDelete, onChange }: Props) {
  return (
    <div className={styles.row} data-completed={task.completed ? "true" : "false"}>
      <button
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        className={`${styles.checkbox} ${task.completed ? styles.checkboxCompleted : ""}`}
        onClick={() => onToggle(task.id)}
      />
      <div className={`${styles.inputWrap} ${task.completed ? styles.inputWrapCompleted : ""}`}>
        <input
          className={styles.input}
          value={task.text}
          onChange={(e) => onChange(task.id, e.target.value)}
        />
        <button
          aria-label="Delete task"
          className={styles.trashBtn}
          onClick={() => onDelete(task.id)}
        >
          <img src={trashIcon} alt="" className={styles.trashIcon} />
        </button>
      </div>
    </div>
  );
}
