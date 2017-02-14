//constructor
function Idea(id, title, body, quality) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = quality || 'swill';
}


//keyup to enable button...keyup to disable
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


//click event on save button...generates new idea card...prepends new card to idea-box section
//counter function to assign unique id to card.
//clear input fields on save click.

///////////working card function///////////////
$("#saveButton").on("click", function(event){
  // var id = Date.now();
  var newIdea = new Idea (id, title, body);
  var storedObj = getIdea (id);
  var title = $('#titleInput').val();
  var body = $('#bodyInput').val();
  var id = getID(this);
  console.log(id)
  event.preventDefault();
  // storeIdea(id, storedObj);
  createCard();
  clearInputs();

})


//
// function createCard($title, $body) {
//   $('#ideaBox').prepend(
//     `<article class="card" id="card">
//       <h2>${$title}</h2>
//       <img class="card-delete" src="images/delete.svg" alt="delete">
//       <p>${$body}</p>
//       <img class="upvote-button" src="images/upvote.svg" alt="upvote button">
//       <img class="downvote-button" src="images/downvote.svg" alt="downvote button">
//       <p>quality:<span>swill</span></p>
//       <hr>
//     </article>`
//   )};

//constructor function


//takes input values and assigns to new constructor
// function recordInput (id) {
//   var title = $('.title-input').val();
//   var body = $('.body-input').val();
//   var newIdea = new Idea (id, title, body);
//   var storedObj = getIdea (id);
//   var id = getID(this)
//   storeIdea (id, storedObj)
// }

function storeIdea (id, card) {
  localStorage.setItem(JSON.stringify(card));
}

function getIdea (id, card) {
  return JSON.parse(localStorage.getItem(id))
}

function getID (selector) {
  return $(selector).closest('.card').attr('id')
}


//create new card to display in DOM
function createCard () {
  // var id = Date.now();
  // var title = $('.title-input').val();
  // var body = $('.body-input').val();
  // var quality = 'swill'
  $('#ideaBox').prepend(
      `<article class="card" id="${this.id}">
        <h2>${this.title}</h2>
        <img class="card-delete" src="images/delete.svg" alt="delete">
        <p>${this.body}</p>
        <img class="upvote-button" src="images/upvote.svg" alt="upvote button">
        <img class="downvote-button" src="images/downvote.svg" alt="downvote button">
        <p>quality:<span>${this.quality}</span></p>
        <hr>
      </article>`
)}

//clear inputs
function clearInputs () {
  $('.title-input').val("");
  $('.body-input').val("");
}

//delete card from DOM and storage
// $(".idea-box").on("click", ".card-delete", function() {
//   var id = $(this).parent().attr("id");
//   localStorage.removeItem(id);
//   $(this).parent().remove();
// });
//



// newIdea.prototype.createCard = function(){
//   return `<article class="card" id="card">
//     <h2>${title}</h2>
//     <img class="card-delete" src="images/delete.svg" alt="delete">
//     <p>${body}</p>
//     <img class="upvote-button" src="images/upvote.svg" alt="upvote button">
//     <img class="downvote-button" src="images/downvote.svg" alt="downvote button">
//     <p>quality:<span>swill</span></p>
//     <hr>
//   </article>`
// }


//delete button on card


//vote up vote down buttons


//filter ideas via search bar


//Title and body text need to be editable on the card, changes saved via enter/return keystrok or clicking outside of field. Changes persist even on page reload.
