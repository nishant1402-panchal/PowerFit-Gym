'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => observer.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('visible'));
}
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  status.className = 'form-status';
  if (!form.checkValidity()) {
    status.textContent = 'Please complete all fields with a valid email and a message of at least 10 characters.';
    status.classList.add('error');
    form.reportValidity();
    return;
  }
  status.textContent = 'Demo form validated successfully! Connect a backend or form service to receive messages.';
  status.classList.add('success');
  form.reset();
});
