import '../styles/SearchPanel.css';
import { useState } from 'react';
export const SearchPanel = () => {
    const [bookTitle, setBookTitle] = useState("");
    const [author, setAuthor] = useState("");
    
    return (
    <div class="search-box">
        <form>

        <label for="author">Author</label>
        <input type="text" id="author" name="author" placeholder="Enter author name"/>
        <label for="book-title">Book Title</label>
        <input type="text" id="book-title" name="author" placeholder="Enter book title"/>
        <button type="submit">Search</button>
        </form>
    </div>
    );
}


