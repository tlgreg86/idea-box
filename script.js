//Retrieve ideas on page load
$(document).ready(retrieveIdeas);


//constructor
function Idea(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality || 'swill';
}


//button disabled
$('#saveButton').prop('disabled', true);

//input field keyup
$('input[type=text]').on('keyup', function(){
  var title = $('#titleInput').val();
  var body = $('#bodyInput').val();
  if (title !== '' || body !== ''){
    $('#saveButton').prop('disabled', false);
  } else {
    $('#saveButton').prop('disabled', true);
  }
});


//Save button click event
$("#saveButton").on("click", function(){
  var title = $('#titleInput').val();
  var body = $('#bodyInput').val();
  var id = Date.now();
  var newIdea = new Idea (id, title, body);
  Idea();
  createCard(newIdea);
  storeIdea(id, newIdea);
  clearInputs();
})


//clear inputs
function clearInputs () {
  $('.title-input').val("");
  $('.body-input').val("");
}


//store idea to localStorage
function storeIdea (id, card) {
  localStorage.setItem(id, JSON.stringify(card));
}


//retrieve stored ideas
function retrieveIdeas () {
  for (var key in localStorage) {
    var parsedIdea = JSON.parse(localStorage[key]);
    createCard(parsedIdea);
  }
}


//create new card to display in DOM
function createCard (idea) {
  $('#ideaBox').prepend(
      `<article class="card" id="${idea.id}">
        <div class="card-delete" alt="delete"></div>
        <h2 id="title" contenteditable=true>${idea.title}</h2>
        <p id="body" contenteditable=true>${idea.body}</p>
        <div class="upvote-button" id="upvote"></div>
        <div class="downvote-button"></div>
        <p class="quality">quality: <h4 id="quality">${idea.quality}</h4></p>
        <hr>
      </article>`
)}


//delete card from DOM and storage
$('#ideaBox').on('click','.card-delete', function() {
  var id = $(this).parent().attr("id");
  localStorage.removeItem(id);
  $(this).parent().remove();
})


//vote up vote down buttons
$('#ideaBox').on('click', '#upvote', function () {
  var selector = $(this).siblings('#quality');
  selector.text() === 'swill' ? selector.text('plausible') : selector.text('genius');
  var currentQuality = selector.text();
  updateQuality(this, currentQuality);
});


//vote down buttons
$('#ideaBox').on('click', '.downvote-button', function() {
  var selector = $(this).siblings('#quality');
  selector.text() === 'genius' ? selector.text('plausible') : selector.text('swill');
  var currentQuality = selector.text();
  updateQuality(this, currentQuality);
});

//edit title/body box and save to local storage on blur
$('#ideaBox').on('blur', '#title', function() {
  var getID = $(this).parent().attr("id");
  var getObj = JSON.parse(localStorage.getItem(getID));
  getObj.title = $('#title').text();
  localStorage.setItem(getID, JSON.stringify(getObj))
});

$('#ideaBox').on('blur', '#body', function() {
  var getID = $(this).parent().attr("id");
  var getObj = JSON.parse(localStorage.getItem(getID));
  getObj.body = $('#body').text();
  localStorage.setItem(getID, JSON.stringify(getObj))
});


//pulls quality from local, updates quality, saves to local
function updateQuality (location, currentQuality) {
  var getID = $(location).parent().attr("id");
  var getObj = JSON.parse(localStorage.getItem(getID));
  getObj.quality = currentQuality;
  localStorage.setItem(getID, JSON.stringify(getObj));
};


//filter ideas via search bar


//Title and body text need to be editable on the card, changes saved via enter/return keystroke or clicking outside of field. Changes persist even on page reload.
