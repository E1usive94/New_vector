(function(){
  const cfg = window.NV_CONFIG || { currentDayUrl: 'day1.html' };
  document.querySelectorAll('[data-current-day-link]').forEach(a => { a.href = cfg.currentDayUrl || 'day1.html'; });
  if (document.body.dataset.redirectToday === 'true') {
    const target = cfg.currentDayUrl || 'day2.html';
    const fallback = document.getElementById('redirectFallback');
    if (fallback) fallback.href = target;
    setTimeout(() => { window.location.href = target; }, 350);
  }

  const buttons = document.querySelectorAll('.filter');
  if (buttons.length) {
    buttons.forEach(btn => btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-type]').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
      });
    }));
  }

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const close = document.getElementById('close');
  document.querySelectorAll('[data-image]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const src = card.getAttribute('data-image');
      if (!src || !modal || !modalImg) return;
      modalImg.src = src;
      modal.classList.add('open');
    });
  });
  function closeModal(){ if(modal) modal.classList.remove('open'); }
  if(close) close.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });
})();
