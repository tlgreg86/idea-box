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
        <div class="upvote-button" id="upvote"></div>
        <div class="downvote-button"></div>
        <p class="quality">quality: <h4 id="quality">${idea.quality}</h4></p>
        <hr>
      </article>`
)}


//delete button on card
// delete card from DOM and storage
$(".idea-box").on("click", ".card-delete", function() {
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

//function to get card out of storage, update, return.
function updateQuality (location, currentQuality) {
  var getID = $(location).parent().attr("id");
  var getObjID = JSON.parse(localStorage.getItem(getID));
  getObjID.quality = currentQuality;
  localStorage.setItem(getID, JSON.stringify(getObjID));
}

//filter ideas via search bar
$('#searchBar').on('keyup', function (){
  var searchText = $(this).val().toLowerCase();
  $('.card').each(function(index, idea) {
    var ideaText = $(this).text().toLowerCase();
    // $(this)[ideaText.indexOf(searchText) !== -1 ? 'show' : 'hide']();
    var matchedText = ideaText.indexOf(searchText) !== -1;
    $(idea).toggle(matchedText);


  })
});
