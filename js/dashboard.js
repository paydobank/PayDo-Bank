// js/dashboard.js — dashboard logic for dashboard.html

(function () {
  const raw = localStorage.getItem('paydo_user');
  const user = raw ? JSON.parse(raw) : null;

  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const avatar = document.getElementById('avatar');
  const userChip = document.getElementById('userChip');
  const ownerName = document.getElementById('ownerName');
  const ownerAccount = document.getElementById('ownerAccount');

  if (avatar) avatar.textContent = initials;
  if (userChip) userChip.textContent = initials;
  if (ownerName) ownerName.textContent = user.name;
  if (ownerAccount) {
    ownerAccount.textContent = 'Account: •••• ' + user.account.slice(-4);
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('paydo_user');
      window.location.href = 'index.html';
    });
  }
})();
