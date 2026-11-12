const draftStatus = document.querySelector('#draft-status');
for (const field of document.querySelectorAll('[data-draft]')) {
  const key = 'engr202-filter-draft:' + location.pathname + '#' + field.id;
  try {
    field.value = localStorage.getItem(key) ?? '';
  } catch {
    draftStatus.textContent = 'Draft saving is unavailable in this browser.';
  }
  field.addEventListener('input', () => {
    try {
      localStorage.setItem(key, field.value);
    } catch {
      draftStatus.textContent = 'Draft saving is unavailable in this browser.';
    }
  });
}
