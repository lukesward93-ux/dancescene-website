const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const wanted = button.dataset.filter;
    document.querySelectorAll('#timetable tbody tr').forEach(row => {
      row.style.display = wanted === 'all' || row.dataset.group === wanted ? '' : 'none';
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent('Dancescene trial / class enquiry');
  const body = encodeURIComponent(
`Name: ${data.get('name') || ''}\nEmail: ${data.get('email') || ''}\nDancer age: ${data.get('age') || ''}\nInterested in: ${data.get('class') || ''}\n\nMessage:\n${data.get('message') || ''}`
  );
  window.location.href = `mailto:dancescene@btinternet.com?subject=${subject}&body=${body}`;
});

// Single-page pop-out details. These objects are deliberately easy to edit as class/teacher details are confirmed.
const detailContent = {
  class: {
    'baby-ballet': {
      kicker: 'Class · Early years', title: 'Baby Ballet',
      intro: 'A playful, confidence-building first step into dance for Dancescene’s youngest performers.',
      meta: [['Age','Toddlers to approx. 5'],['Level','Beginners welcome'],['Training','Movement & ballet foundations'],['Trial','Contact Miss Sophie']],
      copy: '<p>Baby Ballet introduces children to movement, music, coordination and simple ballet foundations in a friendly environment. The emphasis is on enjoying dance, building confidence and becoming comfortable learning as part of a group.</p><h3>What to expect</h3><p>Age-appropriate music, simple movement exercises and lots of encouragement. Exact age bands, uniform details and class times will be added once the current timetable is confirmed.</p>'
    },
    ballet: {
      kicker: 'Class · ISTD', title: 'Ballet',
      intro: 'Structured ballet training that develops technique, posture, artistry and confidence.',
      meta: [['Age','TBC'],['Level','Recreational + exam'],['Exam board','ISTD'],['Trial','Contact Miss Sophie']],
      copy: '<p>Ballet classes combine strong technical foundations with musicality and performance. Dancers can enjoy ballet recreationally or work towards ISTD examinations as they progress.</p><h3>Progress at your own pace</h3><p>Dancescene aims to challenge each dancer while keeping classes positive and supportive. Final grade structure, age bands and timetable details will be added later.</p>'
    },
    tap: {
      kicker: 'Class · Children & adults', title: 'Tap',
      intro: 'Rhythm, musicality and performance with classes available for children and adults.',
      meta: [['Age','Children + adults'],['Level','TBC'],['Exam board','ISTD'],['Trial','Contact Miss Sophie']],
      copy: '<p>Tap is energetic, musical and brilliantly satisfying. Classes develop rhythm, timing, coordination and clear technique while giving dancers plenty of room to enjoy performing.</p><h3>Adult Tap</h3><p>Dancescene also offers adult tap, making it possible to start, return to dance or simply enjoy a weekly class without needing a childhood of dance training behind you.</p>'
    },
    jazz: {
      kicker: 'Class · Performance', title: 'Jazz',
      intro: 'Energetic classes that build style, flexibility, performance quality and confidence.',
      meta: [['Age','TBC'],['Level','TBC'],['Focus','Technique + performance'],['Trial','Contact Miss Sophie']],
      copy: '<p>Jazz classes are lively and expressive, combining technique with choreography and performance skills. They are designed to help dancers become more confident, versatile performers.</p><h3>Performance opportunities</h3><p>Jazz also feeds naturally into Dancescene’s shows and performance experiences, including the school’s previous performances at Disneyland Paris.</p>'
    },
    contemporary: {
      kicker: 'Class · Creative movement', title: 'Contemporary',
      intro: 'Expressive modern movement with an emphasis on creativity, control and musical interpretation.',
      meta: [['Age','TBC'],['Level','TBC'],['Focus','Expression + technique'],['Trial','Contact Miss Sophie']],
      copy: '<p>Contemporary gives dancers space to explore movement and expression while developing control, strength and modern technique. It complements the more structured foundations of ballet and other styles.</p><h3>A supportive environment</h3><p>Classes are taught in the same friendly Dancescene atmosphere, with dancers encouraged to grow in confidence rather than simply chase perfection.</p>'
    }
  },
  teacher: {
    sophie: {
      kicker: 'Meet the team', title: 'Miss Sophie',
      intro: 'Principal and Director of Dancescene, leading the school and its community since 2007.',
      meta: [['Role','Principal / Director'],['Dancescene','Since 2007'],['Training','ISTD'],['Location','Northampton']],
      copy: '<p>Miss Sophie founded and leads Dancescene, creating a school where high-quality dance training sits alongside confidence, friendship and a genuine sense of belonging.</p><p>Her full biography, teaching qualifications and favourite Dancescene memories can be added here once supplied. This profile is designed to hold a proper story without cluttering the main homepage.</p><h3>What matters most</h3><p>The aim is for every dancer, from a toddler taking their first class to an adult returning to tap, to feel welcome, supported and proud of their progress.</p>'
    },
    'teacher-2': {
      kicker: 'Meet the team', title: 'Miss TBC',
      intro: 'Teacher profile ready for the real name, photograph, qualifications and personality.',
      meta: [['Role','Teacher'],['Styles','TBC'],['Qualifications','TBC'],['At Dancescene','TBC']],
      copy: '<p>This space can hold a friendly biography, teaching experience, qualifications and the classes this teacher leads. It can be updated simply in the website data without creating another webpage.</p>'
    },
    'teacher-3': {
      kicker: 'Meet the team', title: 'Miss TBC',
      intro: 'Teacher profile ready for the real name, photograph, qualifications and personality.',
      meta: [['Role','Teacher'],['Styles','TBC'],['Qualifications','TBC'],['At Dancescene','TBC']],
      copy: '<p>This space can hold a friendly biography, teaching experience, qualifications and the classes this teacher leads. It can be updated simply in the website data without creating another webpage.</p>'
    }
  }
};

const modal = document.getElementById('detail-modal');
const modalTitle = document.getElementById('modal-title');
const modalKicker = document.getElementById('modal-kicker');
const modalIntro = document.getElementById('modal-intro');
const modalMeta = document.getElementById('modal-meta');
const modalCopy = document.getElementById('modal-copy');
const modalCta = document.getElementById('modal-cta');
let lastTrigger = null;

function openDetail(trigger) {
  const type = trigger.dataset.modalType;
  const id = trigger.dataset.modalId;
  const item = detailContent[type]?.[id];
  if (!item) return;
  lastTrigger = trigger;
  modalKicker.textContent = item.kicker;
  modalTitle.textContent = item.title;
  modalIntro.textContent = item.intro;
  modalMeta.innerHTML = item.meta.map(([label,value]) => `<div><strong>${label}</strong><span>${value}</span></div>`).join('');
  modalCopy.innerHTML = item.copy;
  modalCta.textContent = type === 'teacher' ? 'Enquire about classes' : 'Book a trial';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}
function closeDetail() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  if (lastTrigger) lastTrigger.focus();
}

document.querySelectorAll('[data-modal-id]').forEach(card => {
  card.addEventListener('click', e => { if (!e.target.closest('a')) openDetail(card); });
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(card); } });
});
document.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', closeDetail));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeDetail(); });
modalCta.addEventListener('click', closeDetail);


// Album-style gallery pop-outs. Replace the placeholder entries with real images later.
const galleryAlbums = {
  performances: {
    title: 'Shows & Performances',
    intro: 'Stage moments, costumes and memories from Dancescene productions.',
    photos: ['Performance 01','Performance 02','Performance 03','Performance 04','Performance 05','Performance 06','Performance 07','Performance 08']
  },
  'baby-ballet': {
    title: 'Baby Ballet',
    intro: 'Some of our littlest dancers taking their first steps into dance.',
    photos: ['Baby Ballet 01','Baby Ballet 02','Baby Ballet 03','Baby Ballet 04','Baby Ballet 05','Baby Ballet 06']
  },
  classes: {
    title: 'Life in Class',
    intro: 'Training, friendships and all the ordinary moments that make Dancescene feel like home.',
    photos: ['Class 01','Class 02','Class 03','Class 04','Class 05','Class 06','Class 07']
  },
  disney: {
    title: 'Disneyland Paris',
    intro: 'Memories from Dancescene’s performance and competition trips to Disneyland Paris.',
    photos: ['Disney 01','Disney 02','Disney 03','Disney 04','Disney 05','Disney 06','Disney 07','Disney 08','Disney 09','Disney 10']
  },
  backstage: {
    title: 'Backstage & Our Team',
    intro: 'The people, preparation and behind-the-scenes moments that bring everything together.',
    photos: ['Backstage 01','Backstage 02','Backstage 03','Backstage 04','Backstage 05']
  }
};

const galleryModal = document.getElementById('gallery-modal');
const galleryTitle = document.getElementById('gallery-modal-title');
const galleryIntro = document.getElementById('gallery-modal-intro');
const galleryCount = document.getElementById('gallery-count');
const galleryScroll = document.getElementById('gallery-scroll');
let lastGalleryTrigger = null;

function openGallery(trigger) {
  const album = galleryAlbums[trigger.dataset.galleryId];
  if (!album) return;
  lastGalleryTrigger = trigger;
  galleryTitle.textContent = album.title;
  galleryIntro.textContent = album.intro;
  galleryCount.textContent = `${album.photos.length} photos`;
  galleryScroll.innerHTML = album.photos.map((name, i) => `
    <article class="gallery-photo-card">
      <div class="gallery-photo-placeholder"><span>${String(i + 1).padStart(2,'0')}</span><strong>${name}</strong></div>
      <div class="gallery-photo-actions">
        <span>Photo ${String(i + 1).padStart(2,'0')}</span>
        <button type="button" class="buy-photo" aria-label="Buy ${name}">Buy print</button>
      </div>
    </article>`).join('');
  galleryModal.classList.add('open');
  galleryModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  galleryModal.querySelector('.modal-close').focus();
}
function closeGallery() {
  galleryModal.classList.remove('open');
  galleryModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  if (lastGalleryTrigger) lastGalleryTrigger.focus();
}

document.querySelectorAll('[data-gallery-id]').forEach(card => card.addEventListener('click', () => openGallery(card)));
document.querySelectorAll('[data-gallery-close]').forEach(el => el.addEventListener('click', closeGallery));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && galleryModal.classList.contains('open')) closeGallery(); });

galleryScroll.addEventListener('click', e => {
  const button = e.target.closest('.buy-photo');
  if (!button) return;
  button.textContent = 'Ordering coming later';
  setTimeout(() => button.textContent = 'Buy print', 1800);
});
