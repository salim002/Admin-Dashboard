import React, {useState, useEffect} from "react";
import './App.css';
import {getUsers} from "./data/fetchData";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(setUsers);
    // console.log(users);
  }, []);
  

  return (
    <div className="App">

    </div>
  );
}

export default App;
