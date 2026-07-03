(function(){
  const cfg = window.NV_CONFIG || { currentDayUrl: 'day1.html' };
  document.querySelectorAll('[data-current-day-link]').forEach(a => { a.href = cfg.currentDayUrl || 'day1.html'; });
  if (document.body.dataset.redirectToday === 'true') {
    const target = cfg.currentDayUrl || 'day1.html';
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

(function(){
  document.querySelectorAll('.media-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.media-carousel-track');
    const prev = carousel.querySelector('.carousel-control--prev');
    const next = carousel.querySelector('.carousel-control--next');
    if (!track || !prev || !next) return;

    const getStep = () => {
      const first = track.querySelector('.gallery-photo--carousel');
      if (!first) return track.clientWidth;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      return first.getBoundingClientRect().width + gap;
    };

    const updateButtons = () => {
      const maxScroll = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= maxScroll;
    };

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  });
})();
