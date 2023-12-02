import React from 'react'

const SearchBox = (props) => {
    const {users, setUsers} = props;

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
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search by name, email or role"
        onChange={searchUsers}
      ></input>
    </div>
  )
}

export default SearchBox
