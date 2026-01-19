# Markdown to Kindle

[![Run Tests](https://github.com/dalepotter/markdown-preview-print/actions/workflows/test.yml/badge.svg)](https://github.com/dalepotter/markdown-preview-print/actions/workflows/test.yml)
[![Deploy to GitHub Pages](https://github.com/dalepotter/markdown-preview-print/actions/workflows/deploy.yml/badge.svg)](https://github.com/dalepotter/markdown-preview-print/actions/workflows/deploy.yml)

[🚀 Live Demo](https://dalepotter.github.io/markdown-preview-print/)

A simple markdown editor with Kindle-optimised print view. Write markdown in your browser, preview in real-time, and send to your Kindle using the Push to Kindle browser extension. Designed for use with [Push to Kindle](https://help.fivefilters.org/push-to-kindle/) browser extension

## Features

- **Live preview**: See your formatted content as you type
- **Split-pane editor**: Write markdown on the left, see rendered output on the right
- **Auto-save**: Content automatically saved to localStorage - never lose your work
- **Sample content**: Helpful example markdown loaded on first visit or by clicking "Load Sample"
- **Kindle-optimised print view**: Clean, readable layout perfect for e-readers
- **No backend required**: Runs entirely in your browser

## How to Send to Kindle

1. Write or paste your markdown content in the editor
2. Click "Print View" to switch to the print-optimised layout
3. Install the [Push to Kindle](https://help.fivefilters.org/push-to-kindle/) browser extension
4. Click the extension icon to send the page to your Kindle

## Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:dalepotter/markdown-preview-print.git
   cd markdown-preview-print
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   This will open the editor in your browser at http://localhost:8080.

## Build

To build for production:
```bash
npm run build
```

This compiles and outputs static files to the `dist/` directory.

## Testing

This project includes a comprehensive test suite built with [Vitest](https://vitest.dev/) and JSDOM.

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once (for CI)
npm run test:run

# Run tests in watch mode (explicit)
npm run test:watch
```

### Test Coverage

The test suite includes:
- **Unit tests** (`test/unit/`) - Individual module testing
  - State management (localStorage)
  - Markdown editor rendering
  - View switching logic
  - Sample content
- **Integration tests** (`test/integration/`) - Full workflow testing
  - Complete app initialisation
  - User interactions (buttons, inputs, keyboard)
  - Persistence across sessions
  - Complex markdown rendering
  - End-to-end workflows

## Deployment

### Automated Deployment

The project auto-deploys to GitHub Pages via GitHub Actions:
1. Push to `main` branch
2. Tests run automatically
3. If tests pass, the app builds and deploys to GitHub Pages

### Manual Deployment

```bash
npm run build
# Deploy the dist/ directory to your hosting provider
```

### GitHub Pages Setup

1. Go to **Settings** > **Pages** in your GitHub repository
2. Under "Build and deployment", set **Source** to "GitHub Actions"
3. The workflows will handle deployment automatically

## Project Structure

```
markdown-preview-print/
├── .github/
│   └── workflows/
│       ├── deploy.yml       # Auto-deploy to GitHub Pages
│       └── test.yml         # Run tests on push/PR
├── .gitignore
├── LICENSE (MIT)
├── README.md
├── package.json
├── webpack.config.js        # Webpack build configuration
├── vitest.config.js         # Vitest testing configuration
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── index.js             # Application entry point
│   ├── style.css            # All styles
│   ├── app/
│   │   └── state.js         # State management (localStorage)
│   ├── editor/
│   │   ├── markdownEditor.js  # Editor logic and rendering
│   │   └── viewSwitcher.js    # View switching
│   └── utils/
│       └── sampleContent.js   # Sample markdown
└── test/
    ├── setup.js             # Test configuration
    ├── unit/                # Unit tests for individual modules
    │   ├── state.test.js
    │   ├── markdownEditor.test.js
    │   ├── viewSwitcher.test.js
    │   └── sampleContent.test.js
    └── integration/         # Integration tests
        └── app.test.js
```

## Architecture

The application follows a modular architecture with clear separation of concerns:

### Core Modules

- **`MarkdownEditor`** (`src/editor/markdownEditor.js`) - Handles markdown input, rendering with marked.js, and live preview updates. Updates both preview and print elements in real-time.
- **`ViewSwitcher`** (`src/editor/viewSwitcher.js`) - Manages switching between editor mode and print-optimised view by toggling CSS classes.
- **`State`** (`src/app/state.js`) - Handles localStorage persistence for auto-save and restore functionality.

### Utilities

- **`sampleContent`** (`src/utils/sampleContent.js`) - Provides example markdown content for first-time users.

### Entry Point

- **`index.js`** (`src/index.js`) - Application entry point that initialises all modules, wires up event listeners, and manages the application lifecycle.

### Dependencies

- **[marked](https://marked.js.org/)** - Fast markdown parser and compiler
- **Webpack** - Module bundler for production builds
- **Vitest** - Fast unit testing framework with JSDOM

## Supported Markdown Features

- Headings (H1-H6)
- Text formatting (bold, italic, strikethrough)
- Lists (ordered and unordered)
- Code blocks and inline code
- Blockquotes
- Links
- Tables
- Horizontal rules
- Images

## Browser Support

Works in all modern browsers that support ES6 modules and localStorage:
- Chrome/Edge 61+
- Firefox 60+
- Safari 11+
-
