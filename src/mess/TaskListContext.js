import React, { createContext, useState, useEffect } from "react";
import uuid from "uuid";

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
  // const initialState = JSON.parse(localStorage.getItem('tasks')) || [] //comment this statement

  const [editItem, setEditItem] = useState(null);
  const [tasks, setTasks] = useState([]);

  const { addList } = props;
  useEffect(() => {
    // localStorage.setItem('tasks', JSON.stringify(tasks)) //comment this statement
    // console.log(tasks);
    addList(tasks); // eslint-disable-next-line
  }, [tasks]);

  // Add tasks
  const addTask = (title) => {
    setTasks([...tasks, { title, id: uuid() }]);
  };

  // Remove tasks
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Clear tasks
  const clearList = () => {
    setTasks([]);
  };

  // Find task
  const findItem = (id) => {
    const item = tasks.find((task) => task.id === id);
    setEditItem(item);
  };

  // Edit task
  const editTask = (title, id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { title, id } : task
    );

    console.log(newTasks);

    setTasks(newTasks);
    setEditItem(null);
  };

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editItem,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListContextProvider;
