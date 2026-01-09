import { describe, it, expect, beforeEach } from 'vitest';
import { MarkdownEditor } from '../../src/editor/markdownEditor.js';

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
});
