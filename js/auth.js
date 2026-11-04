// js/auth.js — login logic for index.html

(function () {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const account = document.getElementById('account').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!account || !password) {
      alert('Please fill in both fields.');
      return;
    }

    if (password.length < 4) {
      alert('Password must be at least 4 characters.');
      return;
    }

    const user = {
      account,
      name: 'Alexander Volkov',
      loginAt: Date.now()
    };

    localStorage.setItem('paydo_user', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  });
})();
