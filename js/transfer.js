// js/transfer.js — transfer logic for transfer.html

console.log('[PayDo] transfer.js loaded');

(function () {
  // Мягкая проверка авторизации — не редиректим, чтобы можно было тестировать
  const raw = localStorage.getItem('paydo_user');
  const user = raw ? JSON.parse(raw) : null;
  if (!user) {
    console.warn('[PayDo] No logged user — prototype mode');
  }

  const form = document.getElementById('transferForm');
  const modal = document.getElementById('errorModal');
  const errorText = document.getElementById('errorText');

  if (!form) {
    console.error('[PayDo] form#transferForm not found');
    return;
  }
  if (!modal) {
    console.error('[PayDo] #errorModal not found');
    return;
  }
  if (!errorText) {
    console.error('[PayDo] #errorText not found');
    return;
  }

  console.log('[PayDo] elements found, binding submit');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const amountInput = document.getElementById('amount');
    const amount = parseFloat(amountInput.value);

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

  function showError(message) {
    console.log('[PayDo] showError:', message);
    errorText.textContent = message;
    modal.classList.add('active');
  }

  // Закрытие по клику на фон
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('active');
  });

  // Закрытие по Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') modal.classList.remove('active');
  });
})();
