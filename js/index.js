console.log("index.js");

showBooks();

function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

//Display Constructor
function Display() {}

 function showBooks()
{
    let books = localStorage.getItem("books");
  if (books == null) {
    myBooks = [];
  } else {
    myBooks = JSON.parse(books);
  }
  
  
  

  

  let uiString = " ";
  myBooks.forEach((element) => {
    uiString += `<tr>
    
    <td>${element.name}</td>
    <td>${element.author}</td>
    <td>${element.type}</td>
  </tr>`;
  });

  tableBody.innerHTML = uiString;
}

Display.prototype.add = function (book) {
  let tableBody = document.getElementById("tableBody");
  let books = localStorage.getItem("books");
  if (books == null) {
    myBooks = [];
  } else {
    myBooks = JSON.parse(books);
  }
  
  myBooks.push(book);
  

  localStorage.setItem('books',JSON.stringify(myBooks));

  let uiString = " ";
  myBooks.forEach((element) => {
    uiString += `<tr>
    
    <td>${element.name}</td>
    <td>${element.author}</td>
    <td>${element.type}</td>
  </tr>`;
  });

  tableBody.innerHTML = uiString;
};

Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};
Display.prototype.show = function (type, showMessage) {
  let message = document.getElementById("message");

  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> ${showMessage}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>`;

  setTimeout(() => {
    message.innerHTML = " ";
  }, 1000);
};

Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  }
  return true;
};

//Add methods to dispaly protoype

// Add submit eventlistener to form

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault();
  console.log("You have submitted the form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;

  let fiction = document.getElementById("fiction");
  let Programming = document.getElementById("Programming");
  let cooking = document.getElementById("cooking");

  if (cooking.checked) {
    type = cooking.value;
  } else if (Programming.checked) {
    type = Programming.value;
  } else {
    type = fiction.value;
  }

  let newBook = new Book(name, author, type);
  let display = new Display();
  if (display.validate(newBook)) {
    display.add(newBook);
    display.clear();
    display.show("success", "YOur book has been adde succesfully");
  }
   else {
    display.show("danger", "You cannot add this book!");
  }
 
}
