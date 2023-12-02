import React, {useEffect} from 'react'
import styles from "./UsersStyle.module.css";
import SingleUser from "./SingleUser";

const Users = (props) => {
    const {users, setUsers, update, setUpdate, selectAllRef, setPage, page} = props;
    // console.log(users);

    const deleteUser = (id) => {
        let tmp = users.filter((user) => user.id !== id);
        setUsers(tmp);
        setUpdate((prevState) => !prevState);
    };

    const editUser = (id) => {
        let tmp = users;
        const index = tmp.findIndex((user) => user.id === id);
        tmp[index].edit = true;
        setUsers(tmp);
        setUpdate((prevState) => !prevState);
    };

    const selectOne = (id) => {
        let tmp = users;
        const index = tmp.findIndex((user) => user.id === id);
        tmp[index].selected = !tmp[index].selected;
        setUsers(tmp);
        setUpdate((prevState) => !prevState);
    };

    const getIndex = (page)=> {
        return (page-1)*10;
    }
    const index = getIndex(page);

    const selectAll = (e) => {
        const listedUserIds = users.filter((user) => user.show).slice(index, index + 10).map((user) => user.id);
        let tmp = users.map((user) => {
            if (listedUserIds.includes(user.id)) {
                user.selected = e.target.checked;
                return user;
            }
            return user;
        });
        setUsers(tmp);
        setUpdate(!update);
    };

    const saveUser = (id, nameRef, emailRef, roleRef) => {
        let tmp = users;
        const index = tmp.findIndex((user) => user.id === id);
        tmp[index].name = nameRef.current.value;
        tmp[index].email = emailRef.current.value;
        tmp[index].role = roleRef.current.value;
        tmp[index].edit = false;
        setUsers(tmp);
        setUpdate((prevState) => !prevState);
    };

    useEffect(() => {
        if (users.length === 0 && page > 1) {
            setPage(page - 1);
        }
    }, [page, setPage, users.length]);


    let Rows = [];
    for(let i = users.filter((user) => user.show).length; i < 10; i++){
        Rows.push(<tr key={i}></tr>);
    }
    if (users.length === 0 && page === 1) {
        return <div>No User Found</div>;
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
              className={styles.checkbox}
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
              users={users}
            ></SingleUser>
          ) : (
            ""
          );
        })}
        {Rows}
      </tbody>
    </table>
  );
}

export default Users
