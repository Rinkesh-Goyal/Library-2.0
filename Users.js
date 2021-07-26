
export default class Users{
    constructor(){
      this.users = [];
    }
  
    setUsers(users) {
      this.users = users;
    }
    
    getUsers() {
      return this.users;
    }
  
    getUser(userEmail) {
      return this.users.find((user) => user.getEmail() === userEmail);
  }
    
    contains(userEmail) {
      return this.users.some((user) => user.getEmail() === userEmail);
    }
  
    addUser(user) {
          this.users.push(user);
      }
      
      deleteUser(userEmail) {
        const userToDelete = this.users.find(
          (user) => user.getEmail() === userEmail);
        this.users.splice(this.users.indexOf(userToDelete), 1);
      }

  }
  
  
  
  
  
  