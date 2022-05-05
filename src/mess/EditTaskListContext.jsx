import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import uuid from "uuid";
import { authAxiosMess } from "../App";

export const EditTaskListContext = createContext();

const TaskListContextProvider = (props) => {
  const { menuId } = useParams();
  const messId = localStorage.getItem("userIdMess");
  const [editItem, setEditItem] = useState(null);
  const [tasks, setTasks] = useState([]);

  const { addList } = props;

  useEffect(() => {
    authAxiosMess
      .get(`api/menu/${messId}/${menuId}`)
      .then((res) => {
        console.log(res);
        console.log(res.data.menu.menuItem);
        setTasks(res.data.menu.menuItem);
      })
      .catch((err) => console.log(err));
  }, [messId, menuId]);

  useEffect(() => {
    addList(tasks); // eslint-disable-next-line
  }, [tasks]);

  // Add tasks
  const addTask = (itemName) => {
    setTasks([...tasks, { itemName: itemName, _id: uuid() }]);
    addList(tasks);
    // console.log(tasks);
  };

  // Remove tasks
  const removeTask = (_id) => {
    setTasks(tasks.filter((task) => task._id !== _id));
  };

  // Clear tasks
  const clearList = () => {
    setTasks([]);
  };

  // Find task
  const findItem = (_id) => {
    const item = tasks.find((task) => task._id === _id);
    setEditItem(item);
  };

  // Edit task
  const editTask = (itemName, _id) => {
    const newTasks = tasks.map((task) =>
      task._id === _id ? { itemName, _id: _id } : task
    );

    // console.log(newTasks);
    setTasks(newTasks);
    setEditItem(null);
  };

  return (
    <EditTaskListContext.Provider
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
    </EditTaskListContext.Provider>
  );
};

export default TaskListContextProvider;
