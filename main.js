// Nav scroll shadow + hide scroll hint on scroll
const nav = document.querySelector('.nav');
const scrollHint = document.querySelector('.hero-scroll-hint');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  if (scrollHint && window.scrollY > 80) scrollHint.style.opacity = '0';
}, { passive: true });

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// Contact form feedback
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.textContent = 'Sent — we\'ll be in touch soon';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = original;
      btn.disabled = false;
      alert('Something went wrong. Please email us directly.');
    }
  });
}
