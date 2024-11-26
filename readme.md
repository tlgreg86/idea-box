# IdeaBox 💡

A modern web application for capturing and managing your ideas. Built with HTML, CSS, and JavaScript.

## Features

- 📝 Create and store ideas with titles and descriptions
- 🔄 Edit ideas in real-time
- ⭐ Rate ideas with quality levels (swill, plausible, genius)
- 🔍 Search through your ideas instantly
- 💾 Persistent storage using localStorage
- 📱 Responsive design for all devices

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- jQuery
- LocalStorage API

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/idea-box.git
   cd idea-box
   ```

2. Open `index.html` in your browser

No additional setup or dependencies required!

## Usage

1. **Creating an Idea**
   - Enter a title and description
   - Click 'save' to store your idea
   - Ideas are automatically saved to localStorage

2. **Managing Ideas**
   - Click on title or body to edit
   - Use upvote/downvote buttons to change quality
   - Click the delete button to remove an idea

3. **Searching Ideas**
   - Type in the search bar to filter ideas
   - Search works across both titles and descriptions

## Code Example

```javascript
class Idea {
  constructor(title, body, quality = 'swill') {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.quality = quality;
  }
}
```

## Recent Updates

- ✨ Modernized JavaScript using ES6+ features
- 🔄 Added auto-expanding textarea
- 💅 Improved button states and user feedback
- 🛡️ Added HTML escaping for security
- 🎨 Enhanced UI/UX with smooth transitions

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## Contributors

- Jack Bevis
- Travis Gregory

## License

This project is part of the front-end engineering program at the Turing School of Software and Design.

---
Made with ❤️ by Jack Bevis and Travis Gregory
