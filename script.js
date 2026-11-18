const root = document.documentElement;
const langToggle = document.getElementById('langToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
let language = 'ar';

function applyLanguage(next) {
  language = next;
  root.lang = next;
  root.dir = next === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar][data-en]').forEach((element) => {
    const value = element.dataset[next];
    if (value && value.includes('<')) element.innerHTML = value;
    else if (value) element.textContent = value;
  });
  document.title = next === 'ar' ? 'بدرالدين البحم | الملف الشخصي' : 'Badr Al-Bahm | Portfolio';
  langToggle.querySelector('span').textContent = next === 'ar' ? 'EN' : 'ع';
  langToggle.querySelector('b').textContent = next === 'ar' ? 'ع' : 'AR';
}

langToggle.addEventListener('click', () => applyLanguage(language === 'ar' ? 'en' : 'ar'));
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.section-label, .about-grid, .skills-intro, .skill-row, .projects-head, .project-card, .education-card').forEach((element) => {
  element.classList.add('scroll-reveal');
  observer.observe(element);
});
