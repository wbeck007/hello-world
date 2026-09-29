const chapters = [...document.querySelectorAll('[data-chapter]')];
const links = [...document.querySelectorAll('.timeline a')];
const progress = document.querySelector('#progress');
function updateChapter() {
  const target = window.innerHeight * 0.4;
  let current = 0;
  chapters.forEach((chapter, index) => {
    if (chapter.getBoundingClientRect().top <= target) current = index;
  });
  links.forEach((link, index) => {
    if (index === current) link.setAttribute('aria-current', 'step');
    else link.removeAttribute('aria-current');
  });
  progress.style.width = `${((current + 1) / chapters.length) * 100}%`;
}
let scheduled = false;
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(() => { updateChapter(); scheduled = false; });
  }
}, {passive: true});
window.addEventListener('resize', updateChapter);
updateChapter();
