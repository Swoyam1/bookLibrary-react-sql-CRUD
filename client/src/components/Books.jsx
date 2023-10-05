import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios("http://localhost:8800/books");
        //console.log(res);
        setBooks(res.data);
      } catch (err) {
        console.log("Error !! Not able fetch client request");
      }
    };
    fetch();
  }, []);
  return (
    <div className="bookContainer">
      <h1>Books Library:</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            <img src={book.cover} alt="" />
            <h2>{book.title}</h2>
            <span>{book.desc}</span>
            <span></span>
            <button className="update">
              <Link className="link" to={`/update/${book.id}`}>
                Update
              </Link>
            </button>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button className="add">
        <Link className="link" to="/add">
          Add a Book
        </Link>
      </button>
    </div>
  );
};

export default Books;
