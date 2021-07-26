import * as data from './Data.js';
import Book from './Book.js';
import Validate from './Validate.js'
import Storage from './Storage.js';


export default class UI {

    static loadHomePage() {
        UI.initAddDeleteAllButton();
        UI.loadBooks();
        UI.initSort();
    }

    static initAddDeleteAllButton() {

        document.querySelector('#delete-all-btn').addEventListener('click', () => {
            document.querySelector('.delete-all').addEventListener('click', () => {
                localStorage.clear();
            })
        })

        const addBookButton = document.querySelector('.new-book');

        addBookButton.addEventListener('click', () => {
            UI.initAddBookPopup();
        })

    }

    static initBookButton() {
        const deleteBookButton = document.querySelectorAll(".delete-button");

        deleteBookButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                if (confirm("Do you really want to delete the book.")) {
                    UI.deleteBook(e.target.id);
                }
                else {
                    return;
                }
            })
        })


        //Change book status Read/Unread
        const statusButton = document.querySelectorAll('.status-button');
        statusButton.forEach((button) => {
            button.addEventListener('click', (event) => {
                UI.changeStatus(event.target.id, event.target.innerHTML);
                UI.loadBooks();
            })
        })
    }



    static initAddBookPopup() {
        const addBookButton = document.querySelector('.add-book');
        const clearBookFormButton = document.querySelector('.clear');

        addBookButton.addEventListener('click', UI.addBook);
        clearBookFormButton.addEventListener('click', UI.clearAddBookForm);
    }

    static addBook() {
        if (Validate()) {
            const book = new Book(data.getBookData().title,
                data.getBookData().author,
                data.getBookData().pages,
                data.getBookData().genre,
                data.getBookData().status
            )
            Storage.addBookToStorage(book);
            UI.clearAddBookForm();
            UI.loadBooks();

        }
    }

    static createBook(book) {
        const tableBody = document.getElementById('table-body');
        let today = new Date(book.dateAdded);
        let date = `${today.getDate()}`.padStart(2, '0');
        let month = `${today.getMonth() + 1}`.padStart(2, '0');
        let year = `${today.getFullYear()}`;
        let fullDate = `${date}/${month}/${year}`;
        tableBody.innerHTML += `
        <div class="col-md-3">
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


        UI.initBookButton();
        UI.displayLibraryInfo();

    }

    static clearAddBookForm() {
        document.querySelector('#b-title').value = '';
        document.querySelector('#b-author').value = '';
        document.querySelector('#b-nbr_of_pages').value = '';
        document.querySelector('#b-genre').value = '';
        document.querySelector('#b-read_status').value = "null";
    }


    static loadBooks() {
        UI.clearBookList();
        Storage.getLibrary()
            .getBooks()
            .forEach((book) => UI.createBook(book));
        UI.displayLibraryInfo();
    }

    static clearBookList() {
        document.querySelector('#table-body').innerHTML = '';
    }

    static deleteBook(bookTitle) {
        Storage.deleteBookFromStorage(bookTitle);
        UI.loadBooks();
    }

    static displayLibraryInfo() {
        const booksUnread = document.querySelector('#books-unread');
        const booksRead = document.querySelector('#books-read');
        const totalBooks = document.querySelector('#total-books');
        let booksReadCount = 0;
        let booksUnReadCount = 0;

        totalBooks.innerHTML = Storage.getLibrary().getBooks().length;
        Storage.getLibrary().getBooks().forEach((book) => {
            if (book.getStatus() === "Read") booksReadCount++;
            else if (book.getStatus() === "Unread") booksUnReadCount++;
        })

        booksRead.innerHTML = booksReadCount;
        booksUnread.innerHTML = booksUnReadCount;
    }

    static changeStatus(bookTitle, status) {
        const library = Storage.getLibrary();
        const book = library.getBooks().find((b) => b.getTitle() === bookTitle);
        if (status === 'Read') book.setStatus('Unread');
        else if (status === 'Unread') book.setStatus('Read');
        Storage.saveLibrary(library);
        UI.loadBooks();
    }

    /*************************************************************************************************** */
    //Error---Think of a logic to sort the view and not the storage
    /*************************************************************************************************** */
    static initSort() {
        const criteriaElement = document.querySelector('#sort');
        const orderElement = document.querySelector('#order');

        let criteria = criteriaElement.options[criteriaElement.selectedIndex].value;
        let order = orderElement.options[orderElement.selectedIndex].value;

        const sortButton = document.getElementById('sort-btn');

        sortButton.addEventListener('click', () => {
            criteria = criteriaElement.options[criteriaElement.selectedIndex].value;
            order = orderElement.options[orderElement.selectedIndex].value;
            console.log(criteria);
            console.log(order);
            if (criteria === 'title' && order === 'asc') {
                Storage.sortLibraryByTitleAsc();
                UI.loadBooks();
            }
            if (criteria === 'title' && order === 'desc') {
                Storage.sortLibraryByTitleDesc();
                UI.loadBooks();
            }

            if (criteria === 'author' && order === 'asc') {
                Storage.sortLibraryByAuthorAsc();
                UI.loadBooks();

            }
            if (criteria === 'author' && order === 'desc') {
                Storage.sortLibraryByAuthorDesc();
                UI.loadBooks();

            }
            if (criteria === 'date' && order === 'asc') {
                Storage.sortLibraryByDateAsc();
                UI.loadBooks();

            }
            if (criteria === 'date' && order === 'desc') {
                Storage.sortLibraryByDateDesc();
                UI.loadBooks();

            }
        })
    }
    /****************************************************************** */
    /****************************************************************** */


}

