const searchBox = document.getElementById('searchBox');
const results = document.getElementById('results');
const definitionShort = document.getElementById('definitionShort');
const closeShort = document.getElementById('closeShort');
const shortVideo = document.getElementById('shortVideo');
const shortWord = document.getElementById('shortWord');
const shortPart = document.getElementById('shortPart');
const shortDefinition = document.getElementById('shortDefinition');
const shortExample = document.getElementById('shortExample');
const shortProgressBar = document.getElementById('shortProgressBar');

const escapeHtml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const playDefinitionShort = ({ word, partOfSpeech, definition, example }) => {
  shortWord.textContent = word;
  shortPart.textContent = partOfSpeech;
  shortDefinition.textContent = definition;
  shortExample.textContent = example ? `Example: ${example}` : '';

  definitionShort.classList.remove('hidden');

  shortVideo.classList.remove('play-short');
  shortProgressBar.classList.remove('play-progress');

  void shortVideo.offsetWidth;

  shortVideo.classList.add('play-short');
  shortProgressBar.classList.add('play-progress');
};

const closeDefinitionShort = () => {
  definitionShort.classList.add('hidden');
  shortVideo.classList.remove('play-short');
  shortProgressBar.classList.remove('play-progress');
};

closeShort.addEventListener('click', closeDefinitionShort);
definitionShort.addEventListener('click', event => {
  if (event.target === definitionShort) closeDefinitionShort();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !definitionShort.classList.contains('hidden')) {
    closeDefinitionShort();
  }
});

searchBox.addEventListener('input', async () => {
  const query = searchBox.value.trim().toLowerCase();
  results.innerHTML = '';

  if (query.length === 0) return;

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
    if (!response.ok) {
      results.innerHTML = '<li>No definition found.</li>';
      return;
    }
    const data = await response.json();

    results.innerHTML = '';

    data[0].meanings.forEach(meaning => {
      meaning.definitions.forEach((def, index) => {
        const li = document.createElement('li');
        li.className = 'definition-card';
        li.tabIndex = 0;
        li.role = 'button';

        li.innerHTML = `
          <div class="definition-meta">
            <span class="part-of-speech">${escapeHtml(meaning.partOfSpeech || 'definition')}</span>
            <span class="definition-index">#${index + 1}</span>
          </div>
          <p class="definition-text">${escapeHtml(def.definition || '')}</p>
          ${def.example ? `<p class="definition-example">“${escapeHtml(def.example)}”</p>` : ''}
        `;

        li.addEventListener('click', () => {
          playDefinitionShort({
            word: query,
            partOfSpeech: meaning.partOfSpeech || 'definition',
            definition: def.definition || '',
            example: def.example || ''
          });
        });

        li.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            li.click();
          }
        });

        results.appendChild(li);
      });
    });
  } catch (error) {
    results.innerHTML = '<li>Error fetching definition.</li>';
  }
});
