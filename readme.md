##Idea box

###Synopsis

####We were asked to create a page where users can create, store, and sort through their ideas. The page takes ideas from the user and houses them in localStorage. The ideas persist and can be called out and edited before being sent back into localStorage.

###Code Example

####Using HTML, CSS, Javascript with jQuery.

####`$("#saveButton").on("click", function(){
  var title = $('#titleInput').val();
  var body = $('#bodyInput').val();
  var id = Date.now();
  var newIdea = new Idea (id, title, body);
  Idea();
  createCard(newIdea);
  storeIdea(id, newIdea);
  clearInputs();
})`

###Motivation

####This project is part of the front-end engineering program on the Turing School of Software and Design.

###Contributors

####Jack Bevis and Travis Gregory
