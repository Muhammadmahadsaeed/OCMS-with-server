const userObject = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
}

const removeUser = ()=>{
  return{
    type : "REMOVE_USER",
    
  }
}
const addToContactList = (contact) => {
  return {
    type: "SET_CONTACT"
  }
}
const removeToContactList = ()=>{
  return{
    type : "REMOVE_CONTACT",
    
  }
}
export { 
  userObject,
  removeUser,
  addToContactList,
  removeToContactList
}
