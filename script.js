const searchBox = document.getElementById('searchBox');
const results = document.getElementById('results');

const escapeHtml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

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

        li.innerHTML = `
          <div class="definition-meta">
            <span class="part-of-speech">${escapeHtml(meaning.partOfSpeech || 'definition')}</span>
            <span class="definition-index">#${index + 1}</span>
          </div>
          <p class="definition-text">${escapeHtml(def.definition || '')}</p>
          ${def.example ? `<p class="definition-example">“${escapeHtml(def.example)}”</p>` : ''}
        `;

        results.appendChild(li);
      });
    });
  } catch (error) {
    results.innerHTML = '<li>Error fetching definition.</li>';
  }
});
