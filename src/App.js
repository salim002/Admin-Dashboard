import React, {useState, useEffect, useRef} from "react";
import './App.css';
import {getUsers} from "./data/fetchData";
import Users from "./components/Users";

function App() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const selectAllRef = useRef(null);

  useEffect(() => {
    getUsers(setUsers);
    // console.log(users);
  }, []);

  const searchInUsers = (search, users) => {
    let tempSearch = search.toLowerCase();
    return users.map((user) => {
      if (
        user.name.toLowerCase().includes(tempSearch) ||
        user.email.toLowerCase().includes(tempSearch) ||
        user.role.toLowerCase().includes(tempSearch)
      ) {
         user.show = true;
         return user;
      }
      user.show = false;
      return user;
    });
  };

  const searchUsers = (e) => {
    setPage(1);
    setUsers(searchInUsers(e.target.value, users));
  };

  const deleteUser = (id) => {
    let tempUsers = users.filter((user) => user.id !== id);
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const editUser = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].edit = true;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].name = nameRef.current.value;
    tempUsers[index].email = emailRef.current.value;
    tempUsers[index].role = roleRef.current.value;
    tempUsers[index].edit = false;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const selectOne = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].selected = !tempUsers[index].selected;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  const selectAll = (e) => {
    const listedUserIds = users
      .filter((user) => user.show)
      .slice(index, index + 10)
      .map((user) => user.id);

    let tempUsers = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(tempUsers);
    setUpdate(!update);
  };

  const deleteSelected = () => {
    if (window.confirm("Selected users will be deleted")) {
      setUsers((prevState) => prevState.filter((user) => !user.selected));
      selectAllRef.current.checked = false;
    }
  };

  const getRecordIndex = (page)=> {
    return (page-1)*10;
  }
  const index = getRecordIndex(page);
  

  return (
    <div className="App">
      <Users
        page={page}
        setPage={setPage}
        selectAll={selectAll}
        selectAllRef={selectAllRef}
        selectOne={selectOne}
        saveUser={saveUser}
        editUser={editUser}
        deleteUser={deleteUser}
        users={users.filter((user) => user.show).slice(index, index + 10)}
      ></Users>
    </div>
  );
}

export default App;
