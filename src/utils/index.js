export function slugify(string) {
  return string.toLowerCase().split(' ').join('-');
}

export function copyToClipboardFallback(string) {
  const textArea = document.createElement('textarea');
  textArea.value = string;

  // Prevent scroll to bottom after appendChild
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '-9999px';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const success = document.execCommand('copy');

    if (success) {
      return Promise.resolve();
    } else {
      throw new Error('Failed to copy to the clipboard');
    }
  } catch (err) {
    return Promise.reject(err);
  } finally {
    document.body.removeChild(textArea);
  }
}

export function copyToClipboard(string) {
  const clipboard = window.navigator.clipboard;

  if (!clipboard || typeof clipboard.writeText !== 'function') {
    return copyToClipboardFallback(string);
  }

  return clipboard.writeText(string);
}
