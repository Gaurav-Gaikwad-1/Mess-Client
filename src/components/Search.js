import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
// import {  useHistory } from "react-router-dom";
import { authAxiosCust } from "../App";

const Search = ({ searchMess }) => {
  const [mess, setMess] = useState([]);
  const [query, setQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    searchMess(mess);
    setQuery("");
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
    authAxiosCust
      .get(`api/search/mess?mess=${e.target.value}`)
      .then((res) => {
        // console.log(res.data.doc);
        setMess(res.data.doc);
        searchMess(res.data.doc);
      })
      .catch((err) => console.log(err));
  };

  return (
    <> 
        <form
          className="form-inline mx-auto"
          style={{ width: "435px",marginTop:"2rem"}}
          onSubmit={onSubmit}
        >
          <input
            className="form-control rounded-pill w-75"
            style={{ border: "1.5px solid" }}
            type="search"
            placeholder="Search Mess..."
            aria-label="Search"
            value={query}
            onChange={handleChange}
          />
          <button className="btn btn-warning ml-2 " type="submit">
            <BiSearchAlt
              className=" text-white"
              style={{ transform: "scale(1.5)" }}
            />
          </button>
        </form>
    </>
  );
};

export default Search;