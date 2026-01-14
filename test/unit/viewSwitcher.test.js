import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ViewSwitcher } from '../../src/editor/viewSwitcher.js';

describe('ViewSwitcher', () => {
  let switcher;

  beforeEach(() => {
    switcher = new ViewSwitcher();
    document.body.className = '';
  });

  afterEach(() => {
    document.body.className = '';
  });

  it('should start in editor view', () => {
    expect(switcher.getCurrentView()).toBe('editor');
  });

  it('should switch to print view', () => {
    switcher.switchToPrintView();
    expect(document.body.classList.contains('print-view')).toBe(true);
    expect(switcher.getCurrentView()).toBe('print');
  });

  it('should switch to editor view', () => {
    switcher.switchToPrintView();
    switcher.switchToEditorView();
    expect(document.body.classList.contains('print-view')).toBe(false);
    expect(switcher.getCurrentView()).toBe('editor');
  });

  it('should toggle between views', () => {
    switcher.toggle();
    expect(switcher.getCurrentView()).toBe('print');
    switcher.toggle();
    expect(switcher.getCurrentView()).toBe('editor');
  });
});
