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
        <h2 contenteditable>${idea.title}</h2>
        <p contenteditable>${idea.body}</p>
        <img class="upvote-button" src="images/upvote.svg" alt="upvote button">
        <img class="downvote-button" src="images/downvote.svg" alt="downvote button">
        <p id="quality">quality:<span>${idea.quality}</span></p>
        <hr>
      </article>`
)}


//delete button on card
// delete card from DOM and storage
$(".idea-box").on("click", ".card-delete", function() {
  var id = $(this).parent().attr("id");
  localStorage.removeItem(id);
  $(this).parent().remove();
});



//vote up vote down buttons
$("#ideaBox").on("click", ".upvote-button", function () {
  var currentQuality = $(this).siblings("#quality");
  currentQuality.text() === "swill" ? currentQuality.text("plausible") : currentQuality.text("genius");
  console.log('Get out the vote!')
  // updateStoredQuality(this, currentQuality);
});

//filter ideas via search bar


//Title and body text need to be editable on the card, changes saved via enter/return keystroke or clicking outside of field. Changes persist even on page reload.
