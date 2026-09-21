// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? '' : 'flex';
  navLinks.style.cssText = open
    ? ''
    : 'display:flex; flex-direction:column; position:fixed; top:0; right:0; bottom:0; width:70%; background:#FFFFFF; padding:100px 32px; gap:24px; z-index:99; border-left:1px solid #E4E6EA;';
});
document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth <= 800) { navLinks.style.cssText = ''; }
}));

// footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: .15 });
revealEls.forEach(el => io.observe(el));

// header shadow on scroll
const header = document.getElementById('siteHeader');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// stat counter animation
function animateCount(el, target, suffix = '') {
  const duration = 1400;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// project photo sliders
document.querySelectorAll('[data-slider]').forEach(slider => {
  const slides = slider.querySelectorAll('.slide');
  const dots = slider.querySelectorAll('.dot');
  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
  });
});

const statsRow = document.querySelector('.statsRow');
if (statsRow) {
  let counted = false;
  const statEls = statsRow.querySelectorAll('.stat b');
  const targets = Array.from(statEls).map(el => {
    const text = el.textContent.trim();
    return { el, value: parseInt(text), suffix: text.replace(/[0-9]/g, '') };
  });
  const statIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted) {
        counted = true;
        targets.forEach(t => animateCount(t.el, t.value, t.suffix));
      }
    });
  }, { threshold: .4 });
  statIo.observe(statsRow);
}