import axios from "axios";
const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const addAttributes = (users)=> {
    return users.map(user => {
        user.selected = false;
        user.edit = false;
        user.show = true;
        return user;
    })
} 

const getUsers = async (setUsers) => {
  try {
    const res = await axios.get(URL);
    // console.log(res.data);
    const newData = addAttributes(res.data);
    // console.log(newData);
    setUsers(newData);
  } catch (error) {
    console.log(error);
  }
};

export {getUsers};
