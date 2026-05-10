const container = document.querySelector("#container");

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