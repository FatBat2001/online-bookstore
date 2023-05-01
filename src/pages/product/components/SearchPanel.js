import "../styles/SearchPanel.css";
import { useState } from "react";
export const SearchPanel = ({onData}) => {
  const [searchKey, setSearchKey] = useState("");

  const handleSubmit = (Event) => {

    Event.preventDefault();
    // console.log(`Search Keyword is ${searchKey} from child`);
    onData(searchKey);
  }  
  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <h2>Search Panel</h2>
        
        <input
          type="text"
          name="author"
          placeholder="Enter  Keyword"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
