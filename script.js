//keyup to enable button...keyup to disable
$('#saveButton').prop('disabled', true);

$('input[type=text]').on('keyup', function(){
  var $title = $('#titleInput').val();
  var $body = $('#bodyInput').val();
  if ($title !== '' || $body !== ''){
    $('#saveButton').prop('disabled', false);
  } else {
    $('#saveButton').prop('disabled', true);
  }
});


//click event on save button...generates new idea card...prepends new card to idea-box section
//counter function to assign unique id to card.
//clear input fields on save click.
$("#saveButton").on("click", function(){
  var title = $("#titleInput").val();
  var body = $("#bodyInput").val();
  
  createCard(title, body)
})

function createCard($title, $body) {
  $('#ideaBox').prepend(
    `<article class="card" id="card">
      <h2>${$title}</h2>
      <img class="card-delete" src="images/delete.svg" alt="delete">
      <p>${$body}</p>
      <img class="upvote-button" src="images/upvote.svg" alt="upvote button">
      <img class="downvote-button" src="images/downvote.svg" alt="downvote button">
      <p>quality:<span>swill</span></p>
      <hr>
    </article>`
  )};


// function newIdea (title, body){
//   var $ideaBox = $("#ideaBox")
//   this.title = title;
//   this.body = body;
//   $ideaBox.prepend(this.createCard())
// }
//
// newIdea.prototype.createCard = function(){
//   return `<article class="card" id="card">
//     <h2>${this.title.val()}</h2>
//     <img class="card-delete" src="images/delete.svg" alt="delete">
//     <p>${this.body.val()}</p>
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
