import React, { useEffect, useState } from "react";
import "./MessSettings.css";
import TaskListContextProvider from "./EditTaskListContext";
import EditTaskForm from "./EditTaskForm";
import { authAxiosMess } from "../App";
import { useParams } from "react-router-dom";
import { Container,Button } from "react-bootstrap";
import {toast} from "react-toastify"

const EditMenu = () => {
  const { menuId } = useParams();
  const messId = localStorage.getItem("userIdMess");
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

  useEffect(() => {
    console.log("edit menu page");
    authAxiosMess
      .get(`api/menu/${messId}/${menuId}`)
      .then((res) => {
        // console.log(res);
        setMenu({
          menuName: res.data.menu.menuName,
          tag: res.data.menu.tag[0],
          price: res.data.menu.price,
          menuItem: res.data.menu.menuItem,
        });
        // console.log(tasks);
      })
      .catch((err) => console.log(err));
  }, [messId, menuId]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("updated MessList");
    console.log(menu);
    const menuData = {
      menuItem: menu.menuItem.map((idx) => {
        return { itemName: idx.itemName };
      }),
      tag: menu.tag,
      menuName: menu.menuName,
      price: menu.price,
    };

    authAxiosMess
      .patch(`api/menu/update/${messId}/${menuId}`, menuData)
      .then((res) => {
        // console.log(res);
        toast.success("menu updated successfully");
        window.location = `/mess/${messId}`;
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Button variant="light" onClick={() => window.location=`/mess/${messId}`}>Go Back</Button>
      <div style={{ width: "70%",margin:"8rem 15%" }} className="mt-4">
        <div className="edit-profile ml-1 container">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="MenuName">Menu Name</label>
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
              <label htmlFor="Type">Type</label>
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
              <label htmlFor="AddItems">Add Items</label>

              <div className="main">
                <TaskListContextProvider addList={addList}>
                  <EditTaskForm />
                </TaskListContextProvider>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="SetPrice">Set Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                id="SetPrice"
                placeholder="Price"
                onChange={addMenu}
                value={menu.price}
                min="10"
                max="999"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-warning text-white d-block mx-auto"
            style={{ width: "7rem" }}
            onClick={onSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </Container>
  );
};

export default EditMenu;
