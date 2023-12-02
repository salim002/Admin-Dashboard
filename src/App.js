import React, {useState, useEffect, useRef} from "react";
import './App.css';
import {getUsers} from "./data/fetchData";
import Users from "./components/Users";
import Paging from "./components/Paging";
import SearchBox from "./components/SearchBox";

function App() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const selectAllRef = useRef(null);

  useEffect(() => {
    getUsers(setUsers);
    // console.log(users);
  }, []);

  const getIndex = (page)=> {
    return (page-1)*10;
  }
  const index = getIndex(page);
  

  return (
    <div className="App">
      <SearchBox
        users={users}
        setUsers={setUsers} 
        selectAllRef={selectAllRef}
      ></SearchBox>
      <Users
        page={page}
        setPage={setPage}
        setUsers={setUsers}
        update={update}
        setUpdate={setUpdate}
        selectAllRef={selectAllRef}
        users={users.filter((user) => user.show).slice(index, index + 10)}
      ></Users>

      <Paging
        usersLength={users.filter((user) => user.show).length}
        page={page}
        setPage={setPage}
        setUsers={setUsers}
        selectAllRef={selectAllRef}
      ></Paging>
    </div>
  );
}

export default App;
