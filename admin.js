import UserData from "./UserData.js";
import validateUser from './UserValidate.js';
import UserStorage from './UserStorage.js';
import Validate from './Validate.js';
import Book from './Book.js'
import * as data from './Data.js';


document.querySelector('#users').textContent = UserStorage.getUsers().users.length;

document.querySelector('.logout').addEventListener('click', () => {
    window.location.href = './index.html';
})
// const users = UserStorage.getUsers().users.;
// console.log(users);

const deleteAllUser = (() => {
    document.querySelector('#delete-all-user').addEventListener('click', () => {
        document.querySelector('.delete-all').addEventListener('click', () => {
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
                        <a href="#" class="btn btn-outline-success view-user-button" style = "width:4.5em;" id="${user.email}" data-bs-toggle="modal"
                        data-bs-target="#userInfoModal">View</a>
                    </td>
                </tr>
    `
    initUserButton();
}

function userInfoModal(email){
    const user = UserStorage.findUserFromStorage(email);
    const modalHeader = document.querySelector('#userInfoModalLabel');
    const dateElement = document.querySelector('.date-user-added');
    const userBookList = document.querySelector('.user-book-list')

    const bookstr = [];

    user.library.books.forEach(book => {
        bookstr.push(book.title);
    })
    bookstr.join(',  ');
    modalHeader.innerHTML = user.email.split('@')[0].toUpperCase();
    dateElement.innerHTML = user.dateAdded.substr(0,10);
    userBookList.innerHTML = bookstr;
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

    const viewButton = document.querySelectorAll('.view-user-button');

    viewButton.forEach(button =>{
        button.addEventListener('click',(e)=>{
            userInfoModal(e.target.id);
        })
    })

}

function deleteUser(email) {
    UserStorage.deleteUserFromStorage(email);
    loadUser();
}

function clearTable() {
    document.querySelector('.user-table-body').innerHTML = '';
}

const searchUser = ()=>{
    const email = document.querySelector('.user-search-input').value;
    const user = UserStorage.findUserFromStorage(email);
    clearTable();
    createTable(user,1);
}

const searchUserAutoComplete = (() =>{
    const users = [];
    UserStorage.getUsers().users.forEach(user => {
        users.push(user.email);
    })

    document.querySelector('.user-search-input').addEventListener('input', (event)=>{
        let userArray = [];
        if(event.target.value){
            userArray = users.filter(user => user.toLowerCase().includes(event.target.value));
            userArray = userArray.map(user => `<option value="${user}"></option>`)
        }
        const html = !userArray.length ? '':userArray.join('');
        document.querySelector('.suggestions').innerHTML = html;
    })    
    document.querySelector('.search-btn').addEventListener('click',searchUser);
})();


