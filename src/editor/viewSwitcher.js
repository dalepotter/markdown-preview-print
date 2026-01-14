export class ViewSwitcher {
  constructor() {
    this.isPrintView = false;
  }

  switchToPrintView() {
    document.body.classList.add('print-view');
    this.isPrintView = true;
  }

  switchToEditorView() {
    document.body.classList.remove('print-view');
    this.isPrintView = false;
  }

  toggle() {
    if (this.isPrintView) {
      this.switchToEditorView();
    } else {
      this.switchToPrintView();
    }
  }

  getCurrentView() {
    return this.isPrintView ? 'print' : 'editor';
  }
}
