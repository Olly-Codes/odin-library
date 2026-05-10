const container = document.querySelector("#container");
const addBookButton = document.querySelector("#add-btn");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookSynopsis = document.querySelector("#synopsis");
const statusMessage = document.querySelector("#status");

const Library = JSON.parse(localStorage.getItem("books")) || [];

function Book(id, title, author, pages, synopsis) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = `${pages} pages`;
    this.synopsis = synopsis;
}

function addBook(title, author, pages, synopsis){
    const bookId = crypto.randomUUID();
    const book = new Book(bookId, title, author, pages, synopsis);

    Library.push(book);
    localStorage.setItem("books", JSON.stringify(Library))
}

function showAllBooks(arr) {
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

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        synopsis.textContent = book.synopsis;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(synopsis);

        container.appendChild(card);
    });
}

addBookButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const synopsis = bookSynopsis.value;

    addBook(title, author, pages, synopsis);
    statusMessage.textContent = "Book Added";
    e.target.closest("form").reset();
})