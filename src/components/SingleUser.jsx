import React, {useRef} from 'react'
import styles from "./SingleUserStyles.module.css";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";

const SingleUser = (props) => {
    const { user, deleteUser, editUser, saveUser, selectOne } = props;
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const roleRef = useRef(null);

  return (
    <tr key={user.id} className={user.selected ? styles.selected : ""}>
      <td>
        <label htmlFor={`check-${user.id}`}>
          <input
            id={`check-${user.id}`}
            type="checkbox"
            data={`${user.selected}`}
            onChange={() => selectOne(user.id)}
            checked={user.selected}
          ></input>
        </label>
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={user.name}
        ></input>
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={user.email}
        />
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={user.role}
        />
      </td>
      <td className={styles.icons}>
        {user.edit ? (
            <FaRegSave onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)} />
        ) : (
            <FaRegEdit onClick={() => editUser(user.id)} />
        )}
        <RiDeleteBin7Line onClick={() => deleteUser(user.id)} />
      </td>
    </tr>
  )
}

export default SingleUser
