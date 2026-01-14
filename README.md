# Markdown to Kindle

[![Run Tests](https://github.com/dalepotter/markdown-preview-print/actions/workflows/test.yml/badge.svg)](https://github.com/dalepotter/markdown-preview-print/actions/workflows/test.yml)
[![Deploy to GitHub Pages](https://github.com/dalepotter/markdown-preview-print/actions/workflows/deploy.yml/badge.svg)](https://github.com/dalepotter/markdown-preview-print/actions/workflows/deploy.yml)

[🚀 **Live Demo**](https://dalepotter.github.io/markdown-preview-print/)

A simple markdown editor with Kindle-optimised print view. Write markdown in your browser, preview in real-time, and send to your Kindle using the [Push to Kindle browser extension](https://help.fivefilters.org/push-to-kindle/).

## Features

- **Live preview**: See your formatted content as you type
- **Split-pane editor**: Write markdown on the left, see rendered output on the right
- **Auto-save**: Content automatically saved to localStorage - never lose your work
- **Sample content**: Helpful example markdown loaded on first visit or by clicking "Load Sample"
- **Kindle-optimised print view**: Clean, readable layout perfect for e-readers

## How to Send to Kindle

1. Write or paste your markdown content in the editor
2. Click "Print View" to switch to the print-optimised layout
3. Install the [Push to Kindle](https://help.fivefilters.org/push-to-kindle/) browser extension
4. Click the extension icon to send the page to your Kindle

## Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:dalepotter/markdown-preview-print.git
   cd markdown-to-kindle
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

## Testing

Run tests:
```bash
npm test
```

## Tech Stack

- **Webpack** - Module bundler
- **Vitest** - Testing framework with JSDOM
- **marked.js** - Markdown parser
