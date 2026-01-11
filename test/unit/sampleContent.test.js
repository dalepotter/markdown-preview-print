import { describe, it, expect } from 'vitest';
import { SAMPLE_MARKDOWN, getSampleContent } from '../../src/utils/sampleContent.js';

describe('Sample Content', () => {
  it('should export sample markdown string', () => {
    expect(SAMPLE_MARKDOWN).toBeDefined();
    expect(typeof SAMPLE_MARKDOWN).toBe('string');
    expect(SAMPLE_MARKDOWN.length).toBeGreaterThan(0);
  });

  it('should include welcome heading', () => {
    expect(SAMPLE_MARKDOWN).toContain('# Welcome to Markdown to Kindle');
  });

  it('should include usage instructions', () => {
    expect(SAMPLE_MARKDOWN).toContain('## How to Use');
  });

  it('should include markdown features section', () => {
    expect(SAMPLE_MARKDOWN).toContain('## Markdown Features');
  });

  it('should include various markdown syntax examples', () => {
    expect(SAMPLE_MARKDOWN).toContain('**bold**');
    expect(SAMPLE_MARKDOWN).toContain('*italic*');
    expect(SAMPLE_MARKDOWN).toContain('`console.log');
    expect(SAMPLE_MARKDOWN).toContain('```');
  });

  it('should return sample content via function', () => {
    expect(getSampleContent()).toBe(SAMPLE_MARKDOWN);
  });
});
