import './style.css';
import { MarkdownEditor } from './editor/markdownEditor.js';
import { saveMarkdown, loadMarkdown } from './app/state.js';
import { getSampleContent } from './utils/sampleContent.js';

// Initialise editor when DOM is ready
window.addEventListener('load', () => {
  const markdownInput = document.getElementById('markdown-input');
  const preview = document.getElementById('preview');
  const printContent = document.getElementById('print-content');
  const loadSampleBtn = document.getElementById('load-sample-btn');

  const editor = new MarkdownEditor(markdownInput, preview, printContent);

  // Load saved content or sample
  const saved = loadMarkdown();
  if (saved) {
    editor.setContent(saved);
  } else {
    loadSample();
  }

  // Auto-save on input
  markdownInput.addEventListener('input', () => {
    saveMarkdown(editor.getContent());
  });

  // Load sample button
  loadSampleBtn.addEventListener('click', loadSample);

  function loadSample() {
    const sample = getSampleContent();
    editor.setContent(sample);
    saveMarkdown(sample);
  }

  console.log('Markdown to Kindle loaded');
});
