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

const infographicSteps = [...document.querySelectorAll('[data-infographic-step]')];
const infographicData = [
  { kicker: 'c. 1455 · PRINTING WORKSHOP', heading: 'Reproduce a shared text.', copy: 'A workshop could make repeated copies of an established text. Publishing required materials, money, machinery, and skilled hands.', publisher: 'A printing workshop', labor: 'Labour: type, presswork, decoration' },
  { kicker: '1517 · PRINT BECOMES AN ARGUMENT', heading: 'Carry a disagreement beyond one room.', copy: 'The same press that reproduced religious texts could help a challenge to authority travel between communities.', publisher: 'Printers, writers, booksellers', labor: 'Labour: writing, setting type, distribution' },
  { kicker: '1848 · A SHARED PROGRAMME', heading: 'Give a movement common language.', copy: 'A political programme could give dispersed readers a shared account of class and work, ready to circulate and discuss.', publisher: 'Writers, translators, distributors', labor: 'Labour: composition, translation, organizing' },
  { kicker: '1993 · THE OPEN WEB', heading: 'Publish a page and share a link.', copy: 'Connected computers made it possible for readers to become contributors, linking to information and adding their own responses.', publisher: 'People with web access', labor: 'Labour: code, hosting, maintenance' },
  { kicker: 'TODAY · THE EVERYDAY POST', heading: 'Make an ordinary message public.', copy: 'A connected person can share a joke, opinion, or experience without asking a print publisher to carry it. Access expands, but attention is still uneven.', publisher: 'Users and platforms', labor: 'Labour: creation, moderation, infrastructure' }
];
const infographicKicker = document.querySelector('#infographic-kicker');
const infographicHeading = document.querySelector('#infographic-heading');
const infographicCopy = document.querySelector('#infographic-copy');
const infographicPublisher = document.querySelector('#infographic-publisher');
const infographicLabor = document.querySelector('#infographic-labor');
function updateInfographic(index) {
  const item = infographicData[index];
  if (!item) return;
  infographicSteps.forEach((step, i) => {
    const selected = i === index;
    step.classList.toggle('is-selected', selected);
    step.setAttribute('aria-pressed', String(selected));
  });
  infographicKicker.textContent = item.kicker;
  infographicHeading.textContent = item.heading;
  infographicCopy.textContent = item.copy;
  infographicPublisher.textContent = item.publisher;
  infographicLabor.textContent = item.labor;
}
infographicSteps.forEach((step) => {
  step.addEventListener('click', () => updateInfographic(Number(step.dataset.infographicStep)));
});
