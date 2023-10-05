import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const id = path.split("/")[2];
  //console.log(id);
  const [books, setBooks] = useState({
    title: "",
    desc: "",
    cover: "",
  });

  const handleChange = (e) => {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //console.log(books);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${id}`, books);
      navigate("/");
    } catch (e) {
      console.log(err);
    }
  };

  return (
    <div className="formContainer">
      <h1>Update Books:</h1>
      <form className="form">
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="desc"
          name="desc"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="cover"
          name="cover"
          onChange={handleChange}
        />
        <div className="update button">
          <button className="updateButton" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
