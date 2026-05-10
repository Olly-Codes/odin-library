const booksContainer = document.querySelector("#books-wrapper");
const addBookButton = document.querySelector("#add-btn");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookSynopsis = document.querySelector("#synopsis");
const readStatus = document.querySelector("#read");
const statusMessage = document.querySelector("#status");

let Library = JSON.parse(localStorage.getItem("books")) || [];

function Book(id, title, author, pages, synopsis, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = `${pages}`;
    this.synopsis = synopsis;
    this.read = read;
}

function addBook(title, author, pages, synopsis, readStatus){
    const bookId = crypto.randomUUID();
    let read = readStatus.checked ? true : false;
    const book = new Book(bookId, title, author, pages, synopsis, read);

    Library.push(book);
    localStorage.setItem("books", JSON.stringify(Library))
    showAllBooks(Library);
}

function deleteBook(id) {
    let newLibrary = Library.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(newLibrary));
    Library = newLibrary;
    showAllBooks(Library);
}

function showAllBooks(arr) {
    booksContainer.replaceChildren();

    if(arr.length === 0) {
        console.log("No books added...");
        return;
    }

    arr.forEach(book => {
        const card = document.createElement("div");
        const title = document.createElement("h1");
        const author = document.createElement("h2");
        const pages = document.createElement("p");
        const synopsis = document.createElement("p");
        const deleteButton = document.createElement("button");

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        synopsis.textContent = book.synopsis;
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-id", `${book.id}`);

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(synopsis);
        card.appendChild(deleteButton);

        booksContainer.appendChild(card);

        deleteButton.addEventListener("click", (e) => {
            deleteBook(book.id);
        });
    });
}

addBookButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const synopsis = bookSynopsis.value;
    const read = readStatus;

    addBook(title, author, pages, synopsis, read);
    statusMessage.textContent = "Book Added";
    e.target.closest("form").reset();
});