// Constants
const QUALITY_LEVELS = {
  SWILL: 'swill',
  PLAUSIBLE: 'plausible',
  GENIUS: 'genius'
};

class Idea {
  constructor(title, body, quality = QUALITY_LEVELS.SWILL) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.quality = quality;
  }
}

class IdeaManager {
  constructor() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    $(document).ready(() => this.loadIdeas());
    $('#saveButton').prop('disabled', true);
    
    // Input validation
    $('input[type=text], textarea').on('keyup', this.validateInputs);
    $('#saveButton').on('click', () => this.saveIdea());
    
    // Card events
    $('.idea-box')
      .on('click', '.card-delete', (e) => this.deleteIdea(e))
      .on('click', '#upvote', (e) => this.updateQuality(e, 'up'))
      .on('click', '.downvote-button', (e) => this.updateQuality(e, 'down'))
      .on('blur', '#title', (e) => this.updateIdeaContent(e, 'title'))
      .on('blur', '#body', (e) => this.updateIdeaContent(e, 'body'));
    
    // Search
    $('#searchBar').on('keyup', (e) => this.searchIdeas(e));
  }


  validateInputs() {
    const title = $('#titleInput').val().trim();
    const body = $('#bodyInput').val().trim();
    $('#saveButton').prop('disabled', !(title && body));
  }

  saveIdea() {
    try {
      const title = $('#titleInput').val().trim();
      const body = $('#bodyInput').val().trim();
      
      if (!title || !body) {
        throw new Error('Title and body are required');
      }

      const idea = new Idea(title, body);
      this.storeIdea(idea);
      this.createCard(idea);
      this.clearInputs();
    } catch (error) {
      console.error('Error saving idea:', error);
    }
  }

  storeIdea(idea) {
    try {
      localStorage.setItem(idea.id, JSON.stringify(idea));
    } catch (error) {
      console.error('Error storing idea:', error);
    }
  }

  loadIdeas() {
    try {
      Object.keys(localStorage)
        .filter(key => !isNaN(key))
        .forEach(key => {
          const idea = JSON.parse(localStorage[key]);
          this.createCard(idea);
        });
    } catch (error) {
      console.error('Error loading ideas:', error);
    }
  }

  createCard(idea) {
    const cardTemplate = `
      <article class="card" id="${idea.id}">
        <div class="card-delete" title="Delete idea"></div>
        <h2 id="title" contenteditable="true">${this.escapeHtml(idea.title)}</h2>
        <p id="body" contenteditable="true">${this.escapeHtml(idea.body)}</p>
        <div class="upvote-button" id="upvote" title="Improve quality"></div>
        <div class="downvote-button" title="Decrease quality"></div>
        <p class="quality">quality: <h4 id="quality">${idea.quality}</h4></p>
        <hr>
      </article>
    `;
    $('#ideaBox').prepend(cardTemplate);
  }

  deleteIdea(event) {
    const card = $(event.target).parent();
    const id = card.attr('id');
    localStorage.removeItem(id);
    card.remove();
  }

  updateQuality(event, direction) {
    const qualityElement = $(event.target).siblings('#quality');
    const currentQuality = qualityElement.text();
    const qualities = Object.values(QUALITY_LEVELS);
    const currentIndex = qualities.indexOf(currentQuality);
    
    let newIndex;
    if (direction === 'up') {
      newIndex = Math.min(currentIndex + 1, qualities.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }
    
    const newQuality = qualities[newIndex];
    qualityElement.text(newQuality);
    
    this.updateIdeaInStorage($(event.target).parent().attr('id'), { quality: newQuality });
  }

  updateIdeaContent(event, field) {
    const card = $(event.target).parent();
    const id = card.attr('id');
    const content = $(event.target).text().trim();
    
    this.updateIdeaInStorage(id, { [field]: content });
  }

  updateIdeaInStorage(id, updates) {
    try {
      const idea = JSON.parse(localStorage.getItem(id));
      const updatedIdea = { ...idea, ...updates };
      localStorage.setItem(id, JSON.stringify(updatedIdea));
    } catch (error) {
      console.error('Error updating idea:', error);
    }
  }

  searchIdeas(event) {
    const searchText = $(event.target).val().toLowerCase();
    $('.card').each((_, idea) => {
      const $idea = $(idea);
      const ideaText = $idea.text().toLowerCase();
      $idea.toggle(ideaText.includes(searchText));
    });
  }

  clearInputs() {
    $('#titleInput, #bodyInput').val('');
    $('#saveButton').prop('disabled', true);
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Initialize the application
new IdeaManager();
