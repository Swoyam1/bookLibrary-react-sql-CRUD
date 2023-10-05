import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState({
    title: "",
    desc: "",
    cover: "",
  });

  const handleChange = (e) => {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(books);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", books);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="formContainer">
      <h1>Add Books:</h1>
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
        <div className="add button">
          <button className="addButton" onClick={handleAdd}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
