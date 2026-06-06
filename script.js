const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    galleryItems.forEach((item) => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

const englishInput = document.getElementById('english-input');
const translateBtn = document.getElementById('translate-btn');
const swahiliOutput = document.getElementById('swahili-output');

const swahiliDictionary = {
  hello: 'habari',
  hi: 'habari',
  good: 'nzuri',
  morning: 'asubuhi',
  afternoon: 'mchana',
  evening: 'jioni',
  thank: 'asante',
  thanks: 'asante',
  you: 'wewe',
  my: 'yangu',
  your: 'yako',
  please: 'tafadhali',
  love: 'upendo',
  family: 'familia',
  portrait: 'picha ya sura',
  art: 'sanaa',
  studio: 'studio',
  memory: 'kumbukumbu',
  memories: 'kumbukumbu',
  detail: 'maelezo',
  beautiful: 'mzuri',
  gift: 'zawadi',
  contact: 'wasiliana',
  order: 'agiza',
  today: 'leo',
  custom: 'mteule',
  amazing: 'ajabu',
  simple: 'rahisi',
  yes: 'ndiyo',
  no: 'hapana',
  welcome: 'karibu',
  quote: 'nukuu',
  support: 'msaada',
};

function preserveCase(original, translated) {
  if (!original) return translated;
  if (original[0] === original[0].toUpperCase()) {
    return translated.charAt(0).toUpperCase() + translated.slice(1);
  }
  return translated;
}

function translateEnglishToSwahili(text) {
  return text
    .split(/(\s+)/)
    .map((token) => {
      if (!token.trim()) return token;
      const match = token.match(/^([A-Za-zÀ-ÖØ-öø-ÿ'-]+)([.,!?;:]*)$/);
      if (!match) return token;
      const [_, word, punctuation] = match;
      const lowerWord = word.toLowerCase();
      const translatedWord = swahiliDictionary[lowerWord] || word;
      return preserveCase(word, translatedWord) + (punctuation || '');
    })
    .join('');
}

translateBtn.addEventListener('click', () => {
  const englishText = englishInput.value.trim();
  if (!englishText) {
    swahiliOutput.textContent = 'Please enter English text to translate.';
    return;
  }

  swahiliOutput.textContent = translateEnglishToSwahili(englishText);
});
