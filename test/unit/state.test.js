import { describe, it, expect, beforeEach } from 'vitest';
import { saveMarkdown, loadMarkdown, clearMarkdown } from '../../src/app/state.js';

describe('State Management', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save markdown to localStorage', () => {
    saveMarkdown('# Test');
    expect(localStorage.getItem('markdown-content')).toBe('# Test');
  });

  it('should load markdown from localStorage', () => {
    localStorage.setItem('markdown-content', '# Test');
    expect(loadMarkdown()).toBe('# Test');
  });

  it('should return null when no content saved', () => {
    expect(loadMarkdown()).toBeNull();
  });

  it('should clear markdown from localStorage', () => {
    saveMarkdown('# Test');
    clearMarkdown();
    expect(loadMarkdown()).toBeNull();
  });
});
