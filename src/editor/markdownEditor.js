import { marked } from 'marked';

export class MarkdownEditor {
  constructor(inputElement, previewElement, printElement) {
    this.inputElement = inputElement;
    this.previewElement = previewElement;
    this.printElement = printElement;

    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true
    });

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.inputElement.addEventListener('input', () => {
      this.render();
    });
  }

  render() {
    const markdown = this.inputElement.value;
    const html = marked.parse(markdown);
    this.previewElement.innerHTML = html;
    if (this.printElement) {
      this.printElement.innerHTML = html;
    }
  }

  setContent(content) {
    this.inputElement.value = content;
    this.render();
  }

  getContent() {
    return this.inputElement.value;
  }

  clear() {
    this.setContent('');
  }
}
