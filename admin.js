import UserData from "./UserData.js";
import validateUser from './UserValidate.js';
import UserStorage from './UserStorage.js';
import Validate from './Validate.js';
import Book from './Book.js'
import * as data from './Data.js';

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})


document.querySelector('#users').textContent = UserStorage.getUsers().users.length;

document.querySelector('.logout').addEventListener('click', () => {
    window.location.href = './index.html';
})
// const users = UserStorage.getUsers().users;
// console.log(users[0].library.books.length);

const deleteAllUser = (()=>{
    document.querySelector('#delete-all-user').addEventListener('click', ()=>{
        document.querySelector('.delete-all').addEventListener('click', ()=>{
            localStorage.clear();
            loadUser();
        })
    });
})();

loadUser();

function createTable(user, i) {
    const table = document.querySelector('.user-table-body');
    table.innerHTML += `
                <tr>
                    <th class = "pt-3" scope="row">${i}</th>
                    <td class = "pt-3">${user.email}</td>
                    <td class = "pt-3">${user.password}</td>
                    <td class = "pt-3">${user.library.books.length}</td>
                    <td class = "my-1">
                        <a href="#" class="btn btn-outline-danger delete-user-button" id="${user.email}">Delete</a>
                            <button class="btn btn-outline-success view-user-button" type="button" style = "width:4.5em;" id="${user.email}" data-bs-toggle="popover" title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">View</button>
                    </td>
                </tr>
    `
    initUserButton();
}

function loadUser() {
    clearTable();
    const users = UserStorage.getUsers().users;
    let i = 1;
    users.forEach(user => {
        createTable(user, i);
        i++;
    });
}

function initUserButton() {
    const deleteButton = document.querySelectorAll('.delete-user-button');

    deleteButton.forEach(button => {
        button.addEventListener('click', (e) => {
            if (confirm("Do you really want to delete the book.")) {
                deleteUser(e.target.id);
            }
            else {
                return;
            }
        })

    })
}

function deleteUser(email){
    UserStorage.deleteUserFromStorage(email);
    loadUser();
}   

function clearTable(){
    document.querySelector('.user-table-body').innerHTML = '';
}

