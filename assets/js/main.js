/**
 * Southaven Sewer Line Repair - Core Script
 * Handles navigation, accessible FAQ accordions, phone click tracking, and form feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (navToggle && mobileDrawer) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', !isOpen);
    });
  }

  // Accessible FAQ Accordions
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parentItem = question.closest('.faq-item');
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      // Toggle current
      question.setAttribute('aria-expanded', !isExpanded);
      if (parentItem) {
        parentItem.classList.toggle('active');
      }
    });
  });

  // Dynamic Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Click-to-Call Tracking Dispatch (LeadSmart ready)
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
          event: 'phone_call_click',
          phoneNumber: link.getAttribute('href').replace('tel:', ''),
          placement: link.getAttribute('data-placement') || 'body_link'
        });
      }
    });
  });

  // Contact Form Feedback Handler
  const contactForm = document.getElementById('lead-intake-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusEl = document.getElementById('form-status-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Request...';
      }

      setTimeout(() => {
        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.innerHTML = '<div style="background:#ECFDF5; border:1px solid #10B981; color:#065F46; padding:1rem; border-radius:6px; margin-top:1rem;"><strong>Thank you!</strong> Your request has been received. A service specialist will review your details and contact you shortly. If your issue is urgent, please call our phone dispatch line directly.</div>';
        }
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Request Service Contact';
        }
      }, 700);
    });
  }
});
