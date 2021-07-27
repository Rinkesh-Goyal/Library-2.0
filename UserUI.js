import UserData from "./UserData.js";
import validateUser from './UserValidate.js';
import UserStorage from './UserStorage.js';
import Validate from './Validate.js';
import Book from './Book.js'
import * as data from './Data.js';


export default class UserUI {

    static loadHomePage() {
        UserUI.initLoginSignupButton();
    }

    static initLoginSignupButton() {
        document.querySelector('.signup-btn').addEventListener('click', () => {
            document.querySelectorAll('.err-msg').forEach((msg) => {
                msg.style.display = 'none'
            })
            UserUI.addUser();
        })
        document.querySelector('.login-btn').addEventListener('click', () => {
            document.querySelectorAll('.login-err-msg').forEach((msg) => {
                msg.style.display = 'none'
            })
            UserUI.getUser();
        })
    }

    static addUser() {
        document.querySelector('.signup-modal-btn').addEventListener('click', () => {
            if (UserStorage.getUsers().contains(UserUI.getUserData().email)) {
                alert('User already exist.');
                UserUI.clearSignUpForm();
            }
            if (validateUser()) {
                document.querySelector('.signup-modal-btn').setAttribute('data-bs-dismiss', 'modal');
                document.querySelectorAll('.err-msg').forEach((msg) => {
                    msg.style.display = 'none'
                })
                const userData = new UserData(UserUI.getUserData().email, UserUI.getUserData().password);
                UserStorage.addUserToStorage(userData);
                UserUI.clearSignUpForm();
            }
        })
    }

    static clearSignUpForm() {
        document.querySelector('.email').value = '';
        document.querySelector('.password').value = '';
        document.querySelector('.confirm-password').value = '';

    }

    static getUserData() {
        const emailElement = document.querySelector('.email');
        const passwordElement = document.querySelector('.password');

        const email = emailElement.value;
        const password = passwordElement.value;

        return { email, password };
    }


    static verifyUser() {
        const emailElement = document.querySelector('.login-email');
        const passwordElement = document.querySelector('.login-password');

        const email = emailElement.value;
        const password = passwordElement.value;

        let loginStatus = true;

        if (email.length === 0) {
            document.querySelector('.login-email-err-msg').style.display = 'block';
            document.querySelector('.login-email-err-msg').textContent = 'Email is Required.'
            emailElement.value = '';
            loginStatus = false;
        }

        const passRegex = /^[a-zA-Z0-9!@#$%^&*_]{6,16}$/;
        if (!passRegex.test(password)) {
            document.querySelector('.login-password-err-msg').style.display = 'block';
            document.querySelector('.login-password-err-msg').textContent = 'Password should be of min length of 6 and max length of 16 and should contains special characters (*,$,#,@,etc) and small and capital letters and should be alpha numeric.';
            passwordElement.value = '';
            loginStatus = false;
        }

        return loginStatus;
    }

    static getUser() {

        document.querySelector('.login-modal-btn').addEventListener('click', () => {
            const emailElement = document.querySelector('.login-email');
            const passwordElement = document.querySelector('.login-password');

            const email = emailElement.value;
            const password = passwordElement.value;
            if (!UserStorage.getUsers().contains(email)) {
                alert('User doesnot exist.')
                UserUI.clearLoginForm();
            }
            else if (UserUI.verifyUser()) {
                const user = UserStorage.findUserFromStorage(email);
                if (user.password === password) {
                    console.log(user);
                    UserUI.clearLoginForm();
                    alert('User successfully logged-in.');
                    document.querySelectorAll('.login-err-msg').forEach((msg) => {
                        msg.style.display = 'none'
                    })
                    UserUI.loadUserPage(email);
                    UserUI.loadBooks(user);
                } else {
                    alert('Password or Email is incorrect.');
                    UserUI.clearLoginForm();
                }
            }
        })
    }

    static clearLoginForm() {
        document.querySelector('.login-email').value = '';
        document.querySelector('.login-password').value = '';
        document.querySelector('.login-err-msg').style.display = 'none';
    }

    static loadUserPage(email) {
        document.querySelector('.login-signup').innerHTML = email;
        UserUI.initAddDeleteAllButton();
    }

    static initAddDeleteAllButton() {

        document.querySelector('#delete-all-btn').addEventListener('click', () => {
            document.querySelector('.delete-all').addEventListener('click', () => {
                const user = UserStorage.findUserFromStorage(document.querySelector('.login-signup').textContent);
                console.log(user.library.books);
            })
        })

        const addBookButton = document.querySelector('.new-book');

        addBookButton.addEventListener('click', () => {
            UserUI.initAddBookPopup();
        })

    }

    static initAddBookPopup() {
        const addBookButton = document.querySelector('.add-book');
        const clearBookFormButton = document.querySelector('.clear');

        addBookButton.addEventListener('click', UserUI.addBook);
        clearBookFormButton.addEventListener('click', UserUI.clearAddBookForm);
    }

    static addBook() {
        const user = UserStorage.findUserFromStorage(document.querySelector('.login-signup').textContent);
        if (Validate()) {
            const book = new Book(data.getBookData().title,
                data.getBookData().author,
                data.getBookData().pages,
                data.getBookData().genre,
                data.getBookData().status
            )
            UserStorage.updateLibrary(user, book);

            UserUI.clearAddBookForm();
            UserUI.loadBooks(user);
        }
    }

    static clearAddBookForm() {
        document.querySelector('#b-title').value = '';
        document.querySelector('#b-author').value = '';
        document.querySelector('#b-nbr_of_pages').value = '';
        document.querySelector('#b-genre').value = '';
        document.querySelector('#b-read_status').value = "null";
    }

    static loadBooks(user) {
        UserUI.clearBookList();
        user.library.books.forEach((book) => UserUI.createBook(book))
        UserUI.displayLibraryInfo();
    }

    static clearBookList() {
        document.querySelector('#table-body').innerHTML = '';
    }

    static createBook(book) {
        const tableBody = document.getElementById('table-body');
        let today = new Date(book.dateAdded);
        let date = `${today.getDate()}`.padStart(2, '0');
        let month = `${today.getMonth() + 1}`.padStart(2, '0');
        let year = `${today.getFullYear()}`;
        let fullDate = `${date}/${month}/${year}`;
        tableBody.innerHTML += `
        <div class="col-md-4">
          <div
            class="
              row
              no-gutters
              border
              rounded
              overflow-hidden
              flex-md-row
              mb-5
              shadow-sm
              h-md-250
              position-relative
              w-75
            "
          >
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-primary">${book.genre}</strong>
              <h3 class="mb-0">${book.title}</h3>
              <div class="mb-1 text-muted">${fullDate}</div>
              <h4 class="card-text mb-auto">${book.author}</h4>
              <div class="card-btn my-4 d-flex justify-content-end">
                <a href="#" class="btn btn-outline-primary status-button" id="${book.title}">${book.status}</a>
                <a href="#" class="btn btn-outline-danger mx-1 delete-button" id="${book.title}">Delete</a>
              </div>
            </div>
          </div>
        </div>
        `


        UserUI.initBookButton();
        UserUI.displayLibraryInfo();

    }

    static displayLibraryInfo() {
        const user = UserStorage.findUserFromStorage(document.querySelector('.login-signup').textContent);
        const booksUnread = document.querySelector('#books-unread');
        const booksRead = document.querySelector('#books-read');
        const totalBooks = document.querySelector('#total-books');
        let booksReadCount = 0;
        let booksUnReadCount = 0;

        totalBooks.innerHTML = user.library.books.length;
        user.library.books.forEach((book) => {
            if (book.status === "Read") booksReadCount++;
            else if (book.status === "Unread") booksUnReadCount++;
        })

        booksRead.innerHTML = booksReadCount;
        booksUnread.innerHTML = booksUnReadCount;
    }

    static initBookButton() {
        const user = UserStorage.findUserFromStorage(document.querySelector('.login-signup').textContent);
        const deleteBookButton = document.querySelectorAll(".delete-button");

        deleteBookButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                if (confirm("Do you really want to delete the book.")) {
                    UserUI.deleteBook(e.target.id);
                }
                else {
                    return;
                }
            })
        })


        // Change book status Read/Unread
        const statusButton = document.querySelectorAll('.status-button');
        statusButton.forEach((button) => {
            button.addEventListener('click', (event) => {
                UserUI.changeStatus(event.target.id, event.target.innerHTML);                
            })
        })
    }

    static deleteBook(bookTitle) {
        const user = UserStorage.findUserFromStorage(document.querySelector('.login-signup').textContent);
        UserStorage.deleteBookFromLibrary(user, bookTitle);
        UserUI.loadBooks(user);
    }

    static changeStatus(bookTitle, status) {
        const user = UserStorage.findUserFromStorage(document.querySelector('.login-signup').textContent);
        const index = user.library.books.findIndex((b) => b.title === bookTitle);
        if (status === 'Read') {
            user.library.books[index].status = 'Unread';
            UserStorage.deleteUserFromStorage(user.email);
            UserStorage.addUserToStorage(user);
            UserUI.loadBooks(user);
        }
        else if (status === 'Unread') {
            user.library.books[index].status = 'Read';
            UserStorage.deleteUserFromStorage(user.email);
            UserStorage.addUserToStorage(user);
            UserUI.loadBooks(user);

        }

    }
}