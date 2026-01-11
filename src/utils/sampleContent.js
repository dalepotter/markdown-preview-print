export const SAMPLE_MARKDOWN = `# Welcome to Markdown to Kindle

This is a simple tool to convert your markdown text into a Kindle-friendly format.

## How to Use

1. Type or paste your markdown in the left panel
2. Preview your content in the right panel
3. Click "Print View" to switch to print-friendly mode
4. Use the **Push to Kindle** browser extension to send to your Kindle

## Markdown Features

### Text Formatting

You can use *italic*, **bold**, or ***bold italic*** text.

You can also use ~~strikethrough~~ text.

### Lists

**Ordered list:**
1. First item
2. Second item
3. Third item

**Unordered list:**
- Item one
- Item two
- Item three

### Code

Inline code: \`console.log('Hello World')\`

Code blocks:

\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

### Quotes

> "The only way to do great work is to love what you do."
> — Steve Jobs

### Links

Visit [Push to Kindle](https://help.fivefilters.org/push-to-kindle/) for details of the browser extension that can be used to send web pages to your Kindle.

### Tables

| Feature | Supported |
|---------|-----------|
| Headers | ✓ |
| Lists | ✓ |
| Code | ✓ |
| Tables | ✓ |

---

Enjoy reading on your Kindle!`;

export function getSampleContent() {
  return SAMPLE_MARKDOWN;
}
