import './style.css';
import { MarkdownEditor } from './editor/markdownEditor.js';

// Initialise editor when DOM is ready
window.addEventListener('load', () => {
  const markdownInput = document.getElementById('markdown-input');
  const preview = document.getElementById('preview');
  const printContent = document.getElementById('print-content');

  const editor = new MarkdownEditor(markdownInput, preview, printContent);

  console.log('Markdown to Kindle loaded');
});
