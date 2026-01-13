import { describe, it, expect, beforeEach } from 'vitest';
import { MarkdownEditor } from '../../src/editor/markdownEditor.js';
import { getSampleContent } from '../../src/utils/sampleContent.js';

describe('App Integration - Editor', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="editor-mode">
        <textarea id="markdown-input"></textarea>
        <div id="preview" class="content"></div>
        <button id="print-view-btn">Print View</button>
        <button id="load-sample-btn">Load Sample</button>
        <button id="clear-btn">Clear</button>
      </div>
      <div class="print-mode">
        <div id="print-content" class="content"></div>
        <button id="editor-view-btn">Back to Editor</button>
      </div>
    `;
  });

  it('should render markdown as user types', () => {
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');

    const editor = new MarkdownEditor(input, preview, printContent);

    // Type markdown
    input.value = '# My Document\n\nThis is **bold** text.';
    input.dispatchEvent(new Event('input'));

    // Check preview rendered
    expect(preview.innerHTML).toContain('<h1');
    expect(preview.innerHTML).toContain('My Document');
    expect(preview.innerHTML).toContain('<strong>bold</strong>');
  });

  it('should save content to localStorage on input', () => {
    localStorage.clear();
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');

    const editor = new MarkdownEditor(input, preview, printContent);

    // Simulate auto-save
    input.addEventListener('input', () => {
      localStorage.setItem('markdown-content', editor.getContent());
    });

    input.value = '# New Content';
    input.dispatchEvent(new Event('input'));
    expect(localStorage.getItem('markdown-content')).toBe('# New Content');
  });

  it('should restore content from localStorage on load', () => {
    localStorage.setItem('markdown-content', '# Saved Content');

    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');

    const editor = new MarkdownEditor(input, preview, printContent);
    const saved = localStorage.getItem('markdown-content');
    if (saved) {
      editor.setContent(saved);
    }

    expect(editor.getContent()).toBe('# Saved Content');
    expect(preview.innerHTML).toContain('Saved Content');
  });

  it('should load sample content on first visit', () => {
    localStorage.clear();

    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');

    const editor = new MarkdownEditor(input, preview, printContent);

    // Simulate first visit
    const saved = localStorage.getItem('markdown-content');
    if (!saved) {
      const sample = getSampleContent();
      editor.setContent(sample);
    }

    expect(editor.getContent()).toContain('Welcome to Markdown to Kindle');
    expect(preview.innerHTML).toContain('Welcome to Markdown to Kindle');
  });

  it('should load saved content instead of sample on return visit', () => {
    localStorage.setItem('markdown-content', '# My Custom Content');

    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');

    const editor = new MarkdownEditor(input, preview, printContent);

    const saved = localStorage.getItem('markdown-content');
    if (saved) {
      editor.setContent(saved);
    }

    expect(editor.getContent()).toBe('# My Custom Content');
    expect(editor.getContent()).not.toContain('Welcome to Markdown to Kindle');
  });

  it('should load sample when button is clicked', () => {
    localStorage.clear();

    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');
    const loadSampleBtn = document.getElementById('load-sample-btn');

    const editor = new MarkdownEditor(input, preview, printContent);

    // Clear any content
    editor.clear();
    expect(editor.getContent()).toBe('');

    // Wire up button
    loadSampleBtn.addEventListener('click', () => {
      const sample = getSampleContent();
      editor.setContent(sample);
    });

    // Click button
    loadSampleBtn.click();

    expect(editor.getContent()).toContain('Welcome to Markdown to Kindle');
    expect(preview.innerHTML).toContain('Welcome to Markdown to Kindle');
  });
});
