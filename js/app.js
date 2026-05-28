/**
 * app.js
 * Entry point. Wires file uploads, run button, and search together.
 */

(() => {
  let followersData = null;
  let followingData = null;
  let allUsers = [];

  function readFile(file, cb) {
    const reader = new FileReader();
    reader.onload = e => cb(e.target.result);
    reader.readAsText(file, 'utf-8');
  }

  function checkReady() {
    document.getElementById('run-btn').disabled = !(followersData && followingData);
  }

  // File uploads
  document.getElementById('file-followers').addEventListener('change', function () {
    if (!this.files[0]) return;
    readFile(this.files[0], text => {
      followersData = Parser.extract(text);
      document.getElementById('count-followers').textContent = `${followersData.size} accounts parsed`;
      document.getElementById('card-followers').classList.add('loaded');
      checkReady();
    });
  });

  document.getElementById('file-following').addEventListener('change', function () {
    if (!this.files[0]) return;
    readFile(this.files[0], text => {
      followingData = Parser.extract(text);
      document.getElementById('count-following').textContent = `${followingData.size} accounts parsed`;
      document.getElementById('card-following').classList.add('loaded');
      checkReady();
    });
  });

  // Run
  document.getElementById('run-btn').addEventListener('click', () => {
    allUsers = [...followingData].filter(u => !followersData.has(u)).sort();
    document.getElementById('total-count').textContent = allUsers.length;
    document.getElementById('search').value = '';
    document.getElementById('results-section').style.display = 'block';

    UI.setFiltered(allUsers);
    UI.renderRows(true);
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
  });

  // Search
  document.getElementById('search').addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    const filtered = q ? allUsers.filter(u => u.includes(q)) : allUsers;
    UI.setFiltered(filtered);
    UI.renderRows(true);
  });

  // Bind list click events (copy + open)
  UI.bindListEvents();
})();
