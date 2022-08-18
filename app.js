// Book Constructor
function Book(title, author, isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;
}

// UI Constructor
function UI(){}

UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');

  //Create tr
  const row = document.createElement('tr');

  //Insert cols
  row.innerHTML = `<td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.isbn}</td>
                  <td><a href="#" class="delete">X</a></td>`
  list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = function(message, className){
  //create div
  const div = document.createElement('div');
  //Add classes
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);

  //Timeout after 3 secs
  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);
}

//Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete')
    target.parentElement.parentElement.remove();
}

//CLear Fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  //Instantiate the book
        const book = new Book(title,author,isbn);
  
  // instantiate UI
  const ui = new UI();

  //Validate
  if(title === '' || author === '' || isbn === '')
  {
    //Error alert
    ui.showAlert('Please fill all fields', 'error');
  }
  else  {
  // Add book to list
  ui.addBookToList(book);

  //Show success
  ui.showAlert('Book Added!', 'success');

  // clear fields
  ui.clearFields();
  }
  e.preventDefault();
});

//Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e){
   // instantiate UI
   const ui = new UI();

   ui.deleteBook(e.target);

   //Show message
   ui.showAlert('Book Removed','success');

  e.preventDefault();
});