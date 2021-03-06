import Users from "./Users.js";
import UserData from "./UserData.js";
export default class UserStorage {

  static saveUsers(data) {
    localStorage.setItem('users', JSON.stringify(data));
  }

  static getUsers() {
    const users = Object.assign(
      new Users(),
      JSON.parse(localStorage.getItem('users')),
    );

    users.setUsers(
      users
        .getUsers()
        .map((user) => Object.assign(new UserData(), user)),
    );

    return users;
  }

  static addUserToStorage(user) {
    const users = UserStorage.getUsers();
    users.addUser(user);
    UserStorage.saveUsers(users);
  }

  static deleteUserFromStorage(userEmail) {
    const users = UserStorage.getUsers();
    users.deleteUser(userEmail);
    UserStorage.saveUsers(users);
  }

  static findUserFromStorage(userEmail) {
    return (UserStorage.getUsers().getUser(userEmail));
  }

  static updateLibrary(user, book) {
    user.library.books.push(book);
    UserStorage.deleteUserFromStorage(user.email);
    UserStorage.addUserToStorage(user);
  }

  static deleteBookFromLibrary(user, bookTitle) {
    user.library.books.splice(user.library.books.findIndex((book) => book.title === bookTitle), 1)
    UserStorage.deleteUserFromStorage(user.email);
    UserStorage.addUserToStorage(user);

  }

  static setPreviousUser(data){
    localStorage.setItem('previousUser',data);
  }

  static getPreviousUser(){
    return localStorage.getItem('previousUser');
  }

  static deletePreviousUser(){
    localStorage.removeItem('previousUser');
  }
}


