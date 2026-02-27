/* ═══════════════════════════════════════════
   js/contact.js — Contact Form (Formspree)
═══════════════════════════════════════════ */
(function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = 'Sending...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        status.textContent = "✓ Message sent — I'll be in touch!";
        form.reset();
      } else {
        status.textContent = '→ Something went wrong. Try emailing directly.';
      }
    } catch {
      status.textContent = '→ Could not send. Try emailing directly.';
    }
  });
})();
