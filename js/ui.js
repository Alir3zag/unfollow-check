/**
 * ui.js
 * Handles all DOM rendering: user rows, pagination, empty states.
 */

const UI = (() => {
  const PAGE_SIZE = 30;

  const COPY_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2-2v1"/></svg>`;
  const EXT_ICON  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

  let filtered = [];
  let shown = 0;

  function setFiltered(users) {
    filtered = users;
    shown = 0;
  }

  function renderRows(reset) {
    const list = document.getElementById('user-list');
    const loadWrap = document.getElementById('load-more-wrap');
    const loadBtn = document.getElementById('load-more-btn');

    if (reset) { list.innerHTML = ''; shown = 0; }

    if (filtered.length === 0) {
      list.innerHTML = '<div class="empty"><strong>All good!</strong>Everyone you follow also follows you back.</div>';
      loadWrap.classList.add('hidden');
      return;
    }

    const slice = filtered.slice(shown, shown + PAGE_SIZE);

    slice.forEach(u => {
      const row = document.createElement('div');
      row.className = 'user-row';
      row.innerHTML = `
        <span class="user-handle">@${u}</span>
        <div class="user-actions">
          <button class="icon-btn" data-user="${u}" title="Copy username">
            ${COPY_ICON} copy
          </button>
          <button class="open-btn" data-url="https://www.instagram.com/${u}/" title="Open profile">
            ${EXT_ICON}
          </button>
        </div>`;
      list.appendChild(row);
    });

    shown += slice.length;
    const remaining = filtered.length - shown;
    loadWrap.classList.toggle('hidden', remaining <= 0);
    if (remaining > 0) loadBtn.textContent = `Load more (${remaining} remaining)`;
  }

  function copyFallback(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  function handleCopy(btn, username) {
    const doConfirm = () => {
      btn.classList.add('copied');
      btn.innerHTML = `${COPY_ICON} copied!`;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = `${COPY_ICON} copy`;
      }, 1800);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(username).then(doConfirm).catch(() => {
        copyFallback(username);
        doConfirm();
      });
    } else {
      copyFallback(username);
      doConfirm();
    }
  }

  function bindListEvents() {
    document.getElementById('user-list').addEventListener('click', e => {
      const copyBtn = e.target.closest('.icon-btn');
      const openBtn = e.target.closest('.open-btn');
      if (copyBtn) handleCopy(copyBtn, copyBtn.dataset.user);
      if (openBtn) window.open(openBtn.dataset.url, '_blank');
    });
    document.getElementById('load-more-btn').addEventListener('click', () => renderRows(false));
  }

  return { setFiltered, renderRows, bindListEvents, PAGE_SIZE };
})();
