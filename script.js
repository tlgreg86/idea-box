$(document).ready(retrieveIdeas);


function Idea(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality || 'swill';
}


$('#saveButton').prop('disabled', true);


$('input[type=text]').on('keyup', function(){
  var title = $('#titleInput').val();
  var body = $('#bodyInput').val();
  if (title !== '' || body !== ''){
    $('#saveButton').prop('disabled', false);
  } else {
    $('#saveButton').prop('disabled', true);
  }
});


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


function clearInputs () {
  $('.title-input').val("");
  $('.body-input').val("");
}


function storeIdea (id, card) {
  localStorage.setItem(id, JSON.stringify(card));
}


function retrieveIdeas () {
  for (var key in localStorage) {
    var parsedIdea = JSON.parse(localStorage[key]);
    createCard(parsedIdea);
  }
}


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


$(".idea-box").on("click", ".card-delete", function() {
  var id = $(this).parent().attr("id");
  localStorage.removeItem(id);
  $(this).parent().remove();
})


$('#ideaBox').on('click', '#upvote', function () {
  var selector = $(this).siblings('#quality');
  selector.text() === 'swill' ? selector.text('plausible') : selector.text('genius');
  var currentQuality = selector.text();
  updateQuality(this, currentQuality);
});


$('#ideaBox').on('click', '.downvote-button', function() {
  var selector = $(this).siblings('#quality');
  selector.text() === 'genius' ? selector.text('plausible') : selector.text('swill');
  var currentQuality = selector.text();
  updateQuality(this, currentQuality);
});


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


function updateQuality (location, currentQuality) {
  var getID = $(location).parent().attr("id");
  var getObj = JSON.parse(localStorage.getItem(getID));
  getObj.quality = currentQuality;
  localStorage.setItem(getID, JSON.stringify(getObj));
};


$('#searchBar').on('keyup', function (){
  var searchText = $(this).val().toLowerCase();
  $('.card').each(function(index, idea) {
    var ideaText = $(this).text().toLowerCase();
    var matchedText = ideaText.indexOf(searchText) !== -1;
    $(idea).toggle(matchedText);
  })
});
