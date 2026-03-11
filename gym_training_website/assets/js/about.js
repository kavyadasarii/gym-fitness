/* ============================================================
   ABOUT PAGE – about.js
   Scroll reveals, animated counters, hero parallax
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. HERO BACKGROUND ZOOM IN ── */
  const heroBg = document.querySelector('.about-hero-bg');
  if (heroBg) {
    // Small delay to trigger CSS transition
    requestAnimationFrame(() => {
      setTimeout(() => heroBg.classList.add('loaded'), 80);
    });
  }

  /* ── 2. HERO PARALLAX ON SCROLL ── */
  /*const heroSection = document.querySelector('.about-hero');
  if (heroSection && heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight * 1.2) {
        heroBg.style.transform = `scale(1) translateY(${scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

  /* ── 3. SCROLL REVEAL (all .reveal / .reveal-left / .reveal-right) ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── 4. ANIMATED COUNTERS ── */
  function animateCounter(el, target, suffix) {
    const duration = 1800;
    const start    = performance.now();
    const isFloat  = target % 1 !== 0;

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out quart
      const eased    = 1 - Math.pow(1 - progress, 4);
      const value    = eased * target;

      el.textContent = isFloat
        ? value.toFixed(1) + suffix
        : Math.floor(value) + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ── 5. TESTIMONIAL SLIDER DRAG (mobile swipe) ── */
  const tGrid = document.querySelector('.testimonial-grid');
  if (tGrid) {
    let isDown = false, startX, scrollLeft;

    tGrid.addEventListener('mousedown', e => {
      isDown    = true;
      startX    = e.pageX - tGrid.offsetLeft;
      scrollLeft = tGrid.scrollLeft;
      tGrid.style.cursor = 'grabbing';
    });
    tGrid.addEventListener('mouseleave', () => { isDown = false; tGrid.style.cursor = ''; });
    tGrid.addEventListener('mouseup', () => { isDown = false; tGrid.style.cursor = ''; });
    tGrid.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - tGrid.offsetLeft;
      const walk = (x - startX) * 1.4;
      tGrid.scrollLeft = scrollLeft - walk;
    });
  }

  /* ── 6. TRAINER CARD — tilt effect on mousemove ── */
  document.querySelectorAll('.trainer-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX   = ((y - centerY) / centerY) * -4;
      const rotY   = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── 7. FEATURE BOX stagger entrance ── */
  const featureBoxes = document.querySelectorAll('.feature-box');
  if (featureBoxes.length) {
    // Add hidden class initially
    featureBoxes.forEach(box => box.classList.add('feat-hidden'));

    const fbObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const boxes = entry.target.parentElement.querySelectorAll('.feature-box');
          boxes.forEach((box, i) => {
            setTimeout(() => box.classList.remove('feat-hidden'), i * 100);
          });
          fbObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (featureBoxes[0]) fbObserver.observe(featureBoxes[0]);
  }

});
