// js/transfer.js — transfer logic for transfer.html

(function () {
  const raw = localStorage.getItem('paydo_user');
  const user = raw ? JSON.parse(raw) : null;

  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  const form = document.getElementById('transferForm');
  const modal = document.getElementById('errorModal');
  const errorText = document.getElementById('errorText');
  const cancelBtn = document.getElementById('cancelBtn');

  if (!form || !modal || !errorText) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);

    if (!amount || amount <= 0) {
      showError('Please enter a valid amount.');
      return;
    }

    if (amount > 100000) {
      showError(
        'Daily Private Banking limit exceeded (€100,000). ' +
        'Please contact your personal manager.'
      );
    } else if (amount > 50000) {
      showError(
        'Additional 2FA confirmation is required for amounts over €50,000. ' +
        'Please contact support.'
      );
    } else {
      showError(
        'The transaction cannot be completed: the recipient has not passed ' +
        'PayDo Secure verification. Please try again later.'
      );
    }
  });

  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function showError(message) {
    errorText.textContent = message;
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }
})();
