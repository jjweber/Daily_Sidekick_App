var data = (localStorage.getItem('notes-list')) ? JSON.parse(localStorage.getItem('notes-list')):{
  todo: [],
  completed: []
};

// Remove and complete icons in SVG format
var removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve" width="512px" height="512px"><g id="trash"><path d="M29.98,6.818c-0.096-1.57-1.387-2.816-2.98-2.816h-3v-1V3c0-1.657-1.344-3-3-3H11 C9.343,0,8,1.343,8,3v0.001v1H5c-1.595,0-2.885,1.246-2.981,2.816H2V8v1c0,1.104,0.896,2,2,2l0,0v17c0,2.209,1.791,4,4,4h16              c2.209,0,4-1.791,4-4V11l0,0c1.104,0,2-0.896,2-2V8V6.818H29.98z M10,3.001c0-0.553,0.447-1,1-1h10c0.553,0,1,0.447,1,1v1H10 V3.001z M26,28.001c0,1.102-0.898,2-2,2H8c-1.103,0-2-0.898-2-2v-17h20V28.001z M28,8v1H4V8V7.001c0-0.553,0.447-1,1-1h22 c0.553,0,1,0.447,1,1V8z"fill="#D80027"/></g></svg>';

renderNotesList();

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('inputMessage').value;

  if (value) {
    addItem(value);
  }
});

document.getElementById('clear').addEventListener('click', function() {
  document.getElementById('inputMessage').value = "";
});

function addItem (value) {
  addItemToDOM(value);
  document.getElementById('inputMessage').value = '';

  data.todo.push(value);
  dataObjectUpdated();
}

function checkForEmptyNotes() {
  if (!data.todo.length) {
    document.getElementById('no-notes-message').style.display = 'block';
  }
  else {
    document.getElementById('no-notes-message').style.display = 'none';
  }
}

function renderNotesList() {

    for (var i = 0; i < data.todo.length; i++) {
      var value = data.todo[i];
      addItemToDOM(value);
    }

    checkForEmptyNotes();
}

function dataObjectUpdated() {
  localStorage.setItem('notes-list', JSON.stringify(data));
  checkForEmptyNotes();
}

function removeItem(obj) {
  var listItemToRemove = obj.parentNode;

  var parent = listItemToRemove.parentNode;
  var value = listItemToRemove.innerText;

  data.todo.splice(data.todo.indexOf(value), 1);

  dataObjectUpdated();

  parent.removeChild(listItemToRemove);
}

function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();

  // Check if the item should be added to the completed list or to re-added to the todo list
  var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) {
  var list = document.getElementById('savedNotes');

  var newNoteListItem = '<li>' + text + '<div class="remove pull-right" onclick="removeItem(this)"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></div></li>';
  list.insertAdjacentHTML( 'beforeend', newNoteListItem );
}
