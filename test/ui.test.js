/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('UI Files', () => {
  it('should have HTML template with required structure', () => {
    const htmlPath = path.resolve(__dirname, '../public/index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Check for required elements
    expect(htmlContent).toContain('id="editor-mode"');
    expect(htmlContent).toContain('id="markdown-input"');
    expect(htmlContent).toContain('id="preview"');
    expect(htmlContent).toContain('id="print-mode"');
    expect(htmlContent).toContain('id="print-content"');

    // Check for required buttons
    expect(htmlContent).toContain('id="load-sample-btn"');
    expect(htmlContent).toContain('id="print-view-btn"');
    expect(htmlContent).toContain('id="clear-btn"');
    expect(htmlContent).toContain('id="editor-view-btn"');
  });

  it('should have CSS file with editor styles', () => {
    const cssPath = path.resolve(__dirname, '../src/style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Check for key CSS classes
    expect(cssContent).toContain('.editor-mode');
    expect(cssContent).toContain('.editor-panel');
    expect(cssContent).toContain('.print-mode');
    expect(cssContent).toContain('.content');
    expect(cssContent).toContain('#markdown-input');
    expect(cssContent).toContain('#preview');
  });

  it('should have index.js that imports CSS', () => {
    const jsPath = path.resolve(__dirname, '../src/index.js');
    const jsContent = fs.readFileSync(jsPath, 'utf-8');

    expect(jsContent).toContain("import './style.css'");
  });
});
