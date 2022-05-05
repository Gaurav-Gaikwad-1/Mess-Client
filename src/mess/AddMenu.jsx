import React, { useState } from "react";
import "./MessSettings.css";
import TaskListContextProvider from "./TaskListContext";
import TaskForm from "./TaskForm";
import { authAxiosMess } from "../App";
import { toast } from "react-toastify";
import { Container, Button } from "@material-ui/core";

const AddMenu = () => {
  const getId = localStorage.getItem("userIdMess");
  const [menu, setMenu] = useState({
    menuName: "",
    tag: "",
    price: "",
    menuItem: [],
  });

  const addMenu = (e) => {
    const { name, value } = e.target;
    setMenu((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  //function to recieve data from child...
  const addList = (data) => {
    setMenu({ ...menu, menuItem: data });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const menuData = {
      menuItem: menu.menuItem.map((idx) => {
        return { itemName: idx.title };
      }),
      tag: menu.tag,
      menuName: menu.menuName,
      price: menu.price,
    };

    authAxiosMess
      .post(`api/menu/new/${getId}`, menuData)
      .then((res) => {
        // console.log(res);
        
        window.location=`/mess/${getId}`;
        toast.success("Item Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong!!!");
      });

    console.log(menu);
  };

  return (
    <Container>
      <Button variant="light" onClick={() => window.location=`/mess/${getId}`}>Go Back</Button>
      <div style={{ width: "70%",margin:"8rem 15%" }} className="mt-4">
        <div className="edit-profile ml-1 container">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="MenuName" className=" text-white">
                Menu Name
              </label>
              <input
                type="text"
                name="menuName"
                className="form-control"
                onChange={addMenu}
                value={menu.menuName}
                id="MenuName"
                placeholder="New Menu"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="Type" className=" text-white">
                Type
              </label>
              <input
                type="text"
                name="tag"
                className="form-control"
                onChange={addMenu}
                value={menu.tag}
                id="Type"
                placeholder="for eg: Upwas"
              />
            </div>
            <div className="form-group col-md-6 position-relative">
              <label htmlFor="AddItems" className=" text-white">
                Add Items
              </label>

              <div className="main">
                {/* <TaskListContextProvider > */}
                <TaskListContextProvider addList={addList}>
                  <TaskForm />
                  {/* <TaskList /> */}
                </TaskListContextProvider>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="SetPrice" className=" text-white">
                Set Price
              </label>
              <input
                type="number"
                name="price"
                className="form-control"
                id="SetPrice"
                placeholder="Price"
                onChange={addMenu}
                value={menu.price}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-warning text-white d-block mx-auto"
            style={{ width: "7rem" }}
            onClick={onSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </Container>
  );
};

export default AddMenu;
