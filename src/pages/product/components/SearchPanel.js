import "../styles/SearchPanel.css";
import { useState } from "react";
export const SearchPanel = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const handleSubmit = (Even) => {

    Even.preventDefault();
    console.log(`Book Title: ${bookTitle}, Author: ${author}`);

  }  
  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <h2>Search Panel</h2>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Enter author name"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="book-title">Book Title</label>
        <input
          type="text"
          id="book-title"
          name="author"
          placeholder="Enter book title"
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
