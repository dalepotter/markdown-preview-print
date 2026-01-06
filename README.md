# Markdown to Kindle

[![Run Tests](https://github.com/dalepotter/markdown-to-kindle/actions/workflows/test.yml/badge.svg)](https://github.com/dalepotter/markdown-to-kindle/actions/workflows/test.yml)
[![Deploy to GitHub Pages](https://github.com/dalepotter/markdown-to-kindle/actions/workflows/deploy.yml/badge.svg)](https://github.com/dalepotter/markdown-to-kindle/actions/workflows/deploy.yml)

A simple markdown editor with Kindle-optimised print view. Write markdown in your browser, preview in real-time, and send to your Kindle using the [Push to Kindle browser extension](https://help.fivefilters.org/push-to-kindle/).

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
