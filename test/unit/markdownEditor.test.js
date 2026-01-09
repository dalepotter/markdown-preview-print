import { describe, it, expect, beforeEach } from 'vitest';
import { MarkdownEditor } from '../../src/editor/markdownEditor.js';

describe('MarkdownEditor', () => {
  let inputElement, previewElement, printElement, editor;

  beforeEach(() => {
    inputElement = document.createElement('textarea');
    previewElement = document.createElement('div');
    printElement = document.createElement('div');
    editor = new MarkdownEditor(inputElement, previewElement, printElement);
  });

  it('should render markdown to HTML', () => {
    editor.setContent('# Hello');
    expect(previewElement.innerHTML).toContain('<h1');
    expect(previewElement.innerHTML).toContain('Hello');
  });

  it('should update preview on input', () => {
    inputElement.value = '**bold**';
    inputElement.dispatchEvent(new Event('input'));
    expect(previewElement.innerHTML).toContain('<strong>bold</strong>');
  });

  it('should update both preview and print elements', () => {
    editor.setContent('# Test');
    expect(previewElement.innerHTML).toBe(printElement.innerHTML);
  });

  it('should get content from input', () => {
    inputElement.value = '# Content';
    expect(editor.getContent()).toBe('# Content');
  });

  it('should clear content', () => {
    editor.setContent('# Test');
    editor.clear();
    expect(editor.getContent()).toBe('');
    expect(previewElement.innerHTML).toBe('');
  });

  it('should render code blocks correctly', () => {
    editor.setContent('`inline code`');
    expect(previewElement.innerHTML).toContain('<code>');
  });

  it('should render lists correctly', () => {
    editor.setContent('- item 1\n- item 2');
    expect(previewElement.innerHTML).toContain('<ul>');
    expect(previewElement.innerHTML).toContain('<li>');
  });
});
