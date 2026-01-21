import './style.css';
import { MarkdownEditor } from './editor/markdownEditor.js';
import { ViewSwitcher } from './editor/viewSwitcher.js';
import { saveMarkdown, loadMarkdown, clearMarkdown } from './app/state.js';
import { getSampleContent } from './utils/sampleContent.js';

// Initialise editor when DOM is ready
window.addEventListener('load', () => {
  const markdownInput = document.getElementById('markdown-input');
  const preview = document.getElementById('preview');
  const printContent = document.getElementById('print-content');
  const loadSampleBtn = document.getElementById('load-sample-btn');
  const printViewBtn = document.getElementById('print-view-btn');
  const editorViewBtn = document.getElementById('editor-view-btn');
  const clearBtn = document.getElementById('clear-btn');

  const editor = new MarkdownEditor(markdownInput, preview, printContent);
  const viewSwitcher = new ViewSwitcher();

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
  loadSampleBtn.addEventListener('click', () => {
    if (confirm('Load sample content? This will replace your current work.')) {
      loadSample();
    }
  });

  // View switching buttons
  printViewBtn.addEventListener('click', () => {
    viewSwitcher.switchToPrintView();
  });

  editorViewBtn.addEventListener('click', () => {
    viewSwitcher.switchToEditorView();
  });

  // Clear button
  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all content?')) {
      editor.clear();
      clearMarkdown();
    }
  });

  function loadSample() {
    const sample = getSampleContent();
    editor.setContent(sample);
    saveMarkdown(sample);
  }

  console.log('Markdown to Kindle loaded');
});
