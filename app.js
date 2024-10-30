// Fetching jokes from the jokes API
const jokeUrl = 'https://jokes-always.p.rapidapi.com/common';
const newsUrl = 'https://google-news13.p.rapidapi.com/latest?lr=en-US';
const rapidApiKey = '91bb3ad3ffmsh1c3ddb7e2250225p1f08bejsnf4d081886e90';

// Fetching options
const jokeOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': rapidApiKey,
    'x-rapidapi-host': 'jokes-always.p.rapidapi.com'
  }
};

const newsOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': rapidApiKey,
    'x-rapidapi-host': 'google-news13.p.rapidapi.com'
  }
};

// Function to fetch a joke
async function fetchJoke() {
  try {
    const response = await fetch(jokeUrl, jokeOptions);
    const result = await response.json();
    console.log("Joke API Response:", result);
    const jokeElement = document.getElementById('joke');
    if (jokeElement) {
      jokeElement.textContent = result.data || "No joke found!";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    const jokeElement = document.getElementById('joke');
    if (jokeElement) {
      jokeElement.textContent = "Failed to load a joke. Please try again!";
    }
  }
}

// Function to fetch news
async function fetchNews() {
  try {
    const response = await fetch(newsUrl, newsOptions);
    const result = await response.json();
    console.log("News API Response:", result);

    const articles = result.items; // Adjust according to the actual response structure
    const newsContainer = document.getElementById('news');

    if (newsContainer) {
      newsContainer.innerHTML = ''; // Clear the news container before adding new content

      if (Array.isArray(articles)) {
        articles.forEach(article => {
          const newsItem = document.createElement('div');
          newsItem.classList.add('news-item');

          // Create title link
          const title = document.createElement('a');
          title.href = article.newsUrl; // Link to the full article
          title.target = '_blank'; // Open in new tab
          title.textContent = article.title;
          title.classList.add('news-title');

          // Create snippet paragraph
          const snippet = document.createElement('p');
          snippet.textContent = article.snippet;

          // Append title and snippet to the news item
          newsItem.appendChild(title);
          newsItem.appendChild(snippet);

          // Append news item to the news container
          newsContainer.appendChild(newsItem);
        });
      } else {
        newsContainer.textContent = "No articles found!";
      }
    }
  } catch (error) {
    console.error("Fetch error:", error);
    const newsContainer = document.getElementById('news');
    if (newsContainer) {
      newsContainer.textContent = "Failed to load news. Please try again!";
    }
  }
}

// Event listener for generating jokes
document.getElementById('generateJoke').addEventListener('click', fetchJoke);

// Fetch news when the script runs
fetchNews();
