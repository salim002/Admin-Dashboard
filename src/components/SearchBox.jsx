import React from 'react'
import styles from "./SearchBoxStyles.module.css";
import { MdOutlineDeleteOutline } from "react-icons/md";

const SearchBox = (props) => {
    const {users, setUsers, selectAllRef} = props;

    const deleteSelected = () => {
        if (window.confirm("Are you sure to delete all selected users?")) {
            setUsers((prevState) => prevState.filter((user) => !user.selected));
            selectAllRef.current.checked = false;
        }
    };

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
        setUsers(searchInUsers(e.target.value, users));
    }

  return (
    <div className={styles.topdiv}>
      <input
        className={styles.search}
        type="text"
        placeholder="Enter Value..."
        onChange={searchUsers}
      ></input>
      <div className={styles.delete} onClick={() => deleteSelected()}>
        <MdOutlineDeleteOutline className={styles.deleteIcon} />
      </div>
    </div>
  )
}

export default SearchBox
