import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MarkdownEditor } from '../../src/editor/markdownEditor.js';
import { ViewSwitcher } from '../../src/editor/viewSwitcher.js';
import { getSampleContent } from '../../src/utils/sampleContent.js';
import { clearMarkdown } from '../../src/app/state.js';

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

  it('should switch to print view when button is clicked', () => {
    const printViewBtn = document.getElementById('print-view-btn');
    const viewSwitcher = new ViewSwitcher();

    expect(viewSwitcher.getCurrentView()).toBe('editor');

    // Wire up button
    printViewBtn.addEventListener('click', () => {
      viewSwitcher.switchToPrintView();
    });

    // Click button
    printViewBtn.click();

    expect(viewSwitcher.getCurrentView()).toBe('print');
    expect(document.body.classList.contains('print-view')).toBe(true);
  });

  it('should navigate between editor and print views', () => {
    const printViewBtn = document.getElementById('print-view-btn');
    const editorViewBtn = document.getElementById('editor-view-btn');
    const viewSwitcher = new ViewSwitcher();

    // Start in editor
    expect(viewSwitcher.getCurrentView()).toBe('editor');

    // Wire up buttons
    printViewBtn.addEventListener('click', () => {
      viewSwitcher.switchToPrintView();
    });

    editorViewBtn.addEventListener('click', () => {
      viewSwitcher.switchToEditorView();
    });

    // Go to print view
    printViewBtn.click();
    expect(viewSwitcher.getCurrentView()).toBe('print');

    // Go back to editor
    editorViewBtn.click();
    expect(viewSwitcher.getCurrentView()).toBe('editor');

    // Navigate again
    printViewBtn.click();
    expect(viewSwitcher.getCurrentView()).toBe('print');
  });

  it('should clear content when confirmed', () => {
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');
    const clearBtn = document.getElementById('clear-btn');

    const editor = new MarkdownEditor(input, preview, printContent);
    editor.setContent('# Some Content');

    // Mock confirm to return true
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    // Wire up button
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all content?')) {
        editor.clear();
        clearMarkdown();
      }
    });

    // Click clear
    clearBtn.click();

    expect(editor.getContent()).toBe('');
    expect(preview.innerHTML).toBe('');
  });

  it('should not clear content when cancelled', () => {
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');
    const clearBtn = document.getElementById('clear-btn');

    const editor = new MarkdownEditor(input, preview, printContent);
    editor.setContent('# Some Content');
    const originalContent = editor.getContent();

    // Mock confirm to return false
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    // Wire up button
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all content?')) {
        editor.clear();
        clearMarkdown();
      }
    });

    // Click clear
    clearBtn.click();

    expect(editor.getContent()).toBe(originalContent);
  });

  it('should keep preview and print content synchronised', () => {
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');

    const editor = new MarkdownEditor(input, preview, printContent);

    // Change content multiple times
    editor.setContent('# First');
    expect(preview.innerHTML).toBe(printContent.innerHTML);

    editor.setContent('# Second');
    expect(preview.innerHTML).toBe(printContent.innerHTML);

    editor.setContent('**Bold text**');
    expect(preview.innerHTML).toBe(printContent.innerHTML);

    // Type in input
    input.value = '# Typed Content';
    input.dispatchEvent(new Event('input'));
    expect(preview.innerHTML).toBe(printContent.innerHTML);
  });

  it('should handle complex markdown correctly', () => {
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');

    const editor = new MarkdownEditor(input, preview, printContent);
    const complexMarkdown = `# Heading

## Subheading

This has **bold** and *italic* text.

\`\`\`javascript
const code = 'block';
\`\`\`

- List item 1
- List item 2

> A quote

| Col1 | Col2 |
|------|------|
| A    | B    |`;

    editor.setContent(complexMarkdown);

    expect(preview.innerHTML).toContain('<h1');
    expect(preview.innerHTML).toContain('<h2');
    expect(preview.innerHTML).toContain('<strong>');
    expect(preview.innerHTML).toContain('<em>');
    expect(preview.innerHTML).toContain('<pre>');
    expect(preview.innerHTML).toContain('<ul>');
    expect(preview.innerHTML).toContain('<blockquote>');
    expect(preview.innerHTML).toContain('<table>');
  });

  it('should handle empty content', () => {
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');

    const editor = new MarkdownEditor(input, preview, printContent);

    editor.setContent('');
    expect(editor.getContent()).toBe('');
    expect(preview.innerHTML).toBe('');
    expect(printContent.innerHTML).toBe('');
  });

  it('should complete full editing workflow', () => {
    localStorage.clear();

    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');
    const printViewBtn = document.getElementById('print-view-btn');
    const editorViewBtn = document.getElementById('editor-view-btn');

    const editor = new MarkdownEditor(input, preview, printContent);
    const viewSwitcher = new ViewSwitcher();

    // Wire up auto-save
    input.addEventListener('input', () => {
      localStorage.setItem('markdown-content', editor.getContent());
    });

    // Wire up view buttons
    printViewBtn.addEventListener('click', () => viewSwitcher.switchToPrintView());
    editorViewBtn.addEventListener('click', () => viewSwitcher.switchToEditorView());

    // Type markdown
    input.value = '# My Document\n\nThis is **bold** text.';
    input.dispatchEvent(new Event('input'));

    // Check preview rendered
    expect(preview.innerHTML).toContain('<h1');
    expect(preview.innerHTML).toContain('My Document');
    expect(preview.innerHTML).toContain('<strong>bold</strong>');

    // Check saved to localStorage
    expect(localStorage.getItem('markdown-content')).toBe('# My Document\n\nThis is **bold** text.');

    // Switch to print view
    printViewBtn.click();
    expect(viewSwitcher.getCurrentView()).toBe('print');
    expect(printContent.innerHTML).toBe(preview.innerHTML);

    // Switch back to editor
    editorViewBtn.click();
    expect(viewSwitcher.getCurrentView()).toBe('editor');
  });

  it('should persist content across page reloads', () => {
    localStorage.clear();

    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');

    // First session
    const editor1 = new MarkdownEditor(input, preview, printContent);
    editor1.setContent('# Persisted Content');
    localStorage.setItem('markdown-content', editor1.getContent());

    // Simulate reload - create new editor instance
    const editor2 = new MarkdownEditor(input, preview, printContent);
    const saved = localStorage.getItem('markdown-content');
    editor2.setContent(saved);

    expect(editor2.getContent()).toBe('# Persisted Content');
    expect(preview.innerHTML).toContain('Persisted Content');
  });

  it('should load sample when confirmed', () => {
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');
    const loadSampleBtn = document.getElementById('load-sample-btn');

    const editor = new MarkdownEditor(input, preview, printContent);
    editor.setContent('# Existing Content');

    // Mock confirm to return true
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    // Wire up button
    loadSampleBtn.addEventListener('click', () => {
      if (confirm('Load sample content? This will replace your current work.')) {
        const sample = getSampleContent();
        editor.setContent(sample);
      }
    });

    loadSampleBtn.click();

    expect(editor.getContent()).toContain('Welcome to Markdown to Kindle');
  });

  it('should not load sample when cancelled', () => {
    const input = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');
    const printContent = document.getElementById('print-content');
    const loadSampleBtn = document.getElementById('load-sample-btn');

    const editor = new MarkdownEditor(input, preview, printContent);
    editor.setContent('# Existing Content');
    const originalContent = editor.getContent();

    // Mock confirm to return false
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    // Wire up button
    loadSampleBtn.addEventListener('click', () => {
      if (confirm('Load sample content? This will replace your current work.')) {
        const sample = getSampleContent();
        editor.setContent(sample);
      }
    });

    loadSampleBtn.click();

    expect(editor.getContent()).toBe(originalContent);
  });
});
