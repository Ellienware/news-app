function fetchNews() {
    const apiKey = 'a7c1c9ded8c94b70874e223ba07085cf';
    const baseUrl = 'https://newsapi.org/v2/top-headlines';
    const countryInput = document.getElementById('country').value;
    const categoryInput = document.getElementById('category').value;
  
    const params = {
      country: countryInput,
      category: categoryInput,
      apiKey: apiKey
    };
  
    const url = new URL(baseUrl);
    url.search = new URLSearchParams(params);
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(newsData => {
        displayNews(newsData.articles);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  }
  
  function displayNews(articles) {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';
  
    articles.forEach(article => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = article.url;
      link.textContent = article.title;
      listItem.appendChild(link);
      newsList.appendChild(listItem);
    });
  }
  