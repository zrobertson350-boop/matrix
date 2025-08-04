const searchBox = document.getElementById('searchBox');
const results = document.getElementById('results');

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
      meaning.definitions.forEach(def => {
        const li = document.createElement('li');
        li.textContent = def.definition;
        results.appendChild(li);
      });
    });
  } catch (error) {
    results.innerHTML = '<li>Error fetching definition.</li>';
  }
});
