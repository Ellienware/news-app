async function fetchNews() {
  const apiKey = 'a7c1c9ded8c94b70874e223ba07085cf';
  const baseUrl = 'https://newsapi.org/v2/top-headlines';
  const country = document.getElementById('country').value.trim();
  const category = document.getElementById('category').value.trim();
  const newsList = document.getElementById('news-list');

  newsList.innerHTML = '<li>Loading news...</li>';

  try {
    const url = new URL(baseUrl);
    url.search = new URLSearchParams({
    category: category || 'general',
    language: 'en',
    apiKey
  });

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsList.innerHTML = '<li>No news found for the given filters.</li>';
      return;
    }

    displayNews(data.articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    newsList.innerHTML = `<li style="color:red;"> ${error.message}</li>`;
  }
}

function displayNews(articles) {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = articles.map(article => `
    <li class="news-item">
      ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News image" class="news-img">` : ''}
      <div class="news-content">
        <a href="${article.url}" target="_blank" rel="noopener noreferrer">
          <h3>${article.title}</h3>
        </a>
        <p>${article.description || 'No description available.'}</p>
        <small>${article.source.name || 'Unknown source'} — ${new Date(article.publishedAt).toLocaleString()}</small>
      </div>
    </li>
  `).join('');
}


  