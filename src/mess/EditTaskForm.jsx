import React, { useState, useContext, useEffect } from "react";
import { EditTaskListContext } from "./EditTaskListContext";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const EditTaskForm = () => {
  const { addTask, clearList, editTask, editItem } = useContext(
    EditTaskListContext
  );
  const { tasks, removeTask, findItem } = useContext(EditTaskListContext);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editItem) {
      addTask(title);
      setTitle("");
    } else {
      editTask(title, editItem._id);
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.itemName);
      console.log(editItem);
    } else {
      setTitle("");
    }
  }, [editItem]);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Add Items..."
          value={title}
          onChange={handleChange}
          required
          className="task-input"
        />
        <div className="button position-absolute" style={{ right: "0" }}>
          <button
            type="submit"
            className="btn add-task-btn pr-2"
            style={{ color: "#FFB800" }}
          >
            {editItem ? <CheckCircleIcon /> : <AddCircleIcon />}
          </button>
          <button className="btn clear-btn mr-2" onClick={clearList}>
            <span>
              <ClearAllIcon />
            </span>
          </button>
        </div>
      </form>
      <div>
        {tasks.length ? (
          <ul className="list">
            {tasks.map((task) => {
              return (
                <li className="list-item" key={task._id}>
                  <span>{task.itemName} </span>
                  <div>
                    <button
                      className="btn-edit task-btn mr-3"
                      onClick={() => findItem(task._id)}
                    >
                      <EditIcon style={{ color: "#FFB800" }} />
                    </button>
                    <button
                      className="btn-delete task-btn mr-3"
                      onClick={() => removeTask(task._id)}
                    >
                      <DeleteIcon style={{ color: "#FFB800" }} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="no-tasks font-monospace">No Menu Items</div>
        )}
      </div>
    </>
  );
};

export default EditTaskForm;
