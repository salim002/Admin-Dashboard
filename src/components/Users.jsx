import React, {useEffect} from 'react'
import styles from "./UsersStyle.module.css";
import SingleUser from "./SingleUser";

const Users = (props) => {
    const {
        users,
        setUsers,
        update,
        setUpdate,
        selectAllRef,
        setPage,
        page,
      } = props;

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

      const selectOne = (id) => {
        let tempUsers = users;
        const index = tempUsers.findIndex((user) => user.id === id);
        tempUsers[index].selected = !tempUsers[index].selected;
        setUsers(tempUsers);
        setUpdate((prevState) => !prevState);
      };

      const getIndex = (page)=> {
        return (page-1)*10;
      }
      const index = getIndex(page);

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

      useEffect(() => {
        if (users.length === 0 && page > 1) {
          setPage(page - 1);
        }
      }, [page, setPage, users.length]);
      let fillRows = [];
      for (
        let i = users.filter((user) => user.show).length;
        i < 10;
        i++
      ) {
        fillRows.push(<tr key={i}></tr>);
      }
    
      if (users.length === 0 && page === 1) {
        return <div>NO USERS IN THE SYSTEM</div>;
      }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              ref={selectAllRef}
              onChange={(e) => {
                selectAll(e);
              }}
              name="selectAll"
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return user.show ? (
            <SingleUser
              selectOne={selectOne}
              saveUser={saveUser}
              editUser={editUser}
              deleteUser={deleteUser}
              key={user.id}
              user={user}
            ></SingleUser>
          ) : (
            ""
          );
        })}
        {fillRows}
      </tbody>
    </table>
  );
}

export default Users
