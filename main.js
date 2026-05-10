const booksContainer = document.querySelector("#books-wrapper");
const addBookButton = document.querySelector("#add-btn");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookSynopsis = document.querySelector("#synopsis");
const readStatus = document.querySelector("#read");
const statusMessage = document.querySelector("#status");

const libraryData = JSON.parse(localStorage.getItem("books")) || [];
let library = libraryData.map((book) => {
    return new Book(
        book.id,
        book.title,
        book.author,
        book.pages,
        book.synopsis,
        book.read
    );
});

function Book(id, title, author, pages, synopsis, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = `${pages}`;
    this.synopsis = synopsis;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
}

function addBook(title, author, pages, synopsis, readStatus){
    const bookId = crypto.randomUUID();
    let read = readStatus.checked ? true : false;
    const book = new Book(bookId, title, author, pages, synopsis, read);

    library.push(book);
    saveAndShowBooks();
}

function deleteBook(id) {
    library = library.filter((book) => book.id !== id);
    saveAndShowBooks();
}

function updateReadStatus(id){
    library.forEach((book) => {
        if (id === book.id) {
            book.toggleReadStatus();
        }
    });
    saveAndShowBooks();
}

function saveAndShowBooks(){
    localStorage.setItem("books", JSON.stringify(library));
    showAllBooks(library);
}

function showAllBooks(arr) {
    booksContainer.replaceChildren();

    if(arr.length === 0) {
        console.log("No books added...");
        return;
    }

    arr.forEach(book => {
        const card = document.createElement("div");
        const cardInfo = document.createElement("div");
        const title = document.createElement("h2");
        const author = document.createElement("h3");
        const pages = document.createElement("p");
        const synopsis = document.createElement("p");
        const buttonWrapper = document.createElement("div");
        const updateReadStatusButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        card.classList.add("card");
        cardInfo.classList.add("card-info");
        title.classList.add("title");
        author.classList.add("author");
        pages.classList.add("pages");
        buttonWrapper.classList.add("button-wrapper");
        synopsis.classList.add("synopsis");

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = `${book.pages} pages`;
        synopsis.textContent = book.synopsis;
        updateReadStatusButton.textContent = book.read ? "Mark as unread" : "Mark as read";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-id", `${book.id}`);

        cardInfo.appendChild(title);
        cardInfo.appendChild(author);
        cardInfo.appendChild(pages);
        cardInfo.appendChild(synopsis);
        cardInfo.appendChild(buttonWrapper);

        buttonWrapper.appendChild(updateReadStatusButton);
        buttonWrapper.appendChild(deleteButton);

        card.appendChild(cardInfo);

        booksContainer.appendChild(card);

        deleteButton.addEventListener("click", (e) => {
            deleteBook(book.id);
        });

        updateReadStatusButton.addEventListener("click", (e) => {
            updateReadStatus(book.id);
        })
    });
}

addBookButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const synopsis = bookSynopsis.value;

    addBook(title, author, pages, synopsis, read);
    statusMessage.textContent = "Book Added";
    statusMessage.style.visibility = "visible";

    setTimeout(() => {
        statusMessage.style.visibility = "hidden";
    }, 2000);

    e.target.closest("form").reset();
});

showAllBooks(library);