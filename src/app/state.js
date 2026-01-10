const STORAGE_KEY = 'markdown-content';

export function saveMarkdown(content) {
  localStorage.setItem(STORAGE_KEY, content);
}

export function loadMarkdown() {
  return localStorage.getItem(STORAGE_KEY);
}

export function clearMarkdown() {
  localStorage.removeItem(STORAGE_KEY);
}
