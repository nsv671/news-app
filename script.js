const API_KEY = 'a187bb3eb3a34add8b933555409454c5';
const place_golder = 'https://placeholder.pics/svg/300x400';
const URL = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', fetchNews('India'));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  dataBind(data.articles);
}

function dataBind(articles) {
  const newsCardsContainer = document.querySelector('.news-cards');
  const templateNewsCard = document.querySelector('.template-news-card');

  newsCardsContainer.innerHTML = '';

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cloneTemplateNewsCard = templateNewsCard.content.cloneNode(true);

    fillDataInCards(cloneTemplateNewsCard, article);

    newsCardsContainer.appendChild(cloneTemplateNewsCard);
  });
}

function fillDataInCards(cloneCard, article) {
  const newsImage = cloneCard.getElementById('news-card-img');
  const newsContent = cloneCard.getElementById('news-desc');
  const newsTitle = cloneCard.getElementById('news-content-header');
  const newsSource = cloneCard.getElementById('source');
  const newsDate = cloneCard.getElementById('date');
  const date = new Date(article.publishedAt)
    .toLocaleString('en-US', {
      timeZone: 'Asia/Jakarta',
    })
    .split(',')[0];

  newsImage.src = article.urlToImage;
  newsContent.innerHTML = article.description;
  newsTitle.innerHTML = article.title;
  newsSource.innerHTML = article.source.name;
  newsDate.innerHTML = date;

  cloneCard.firstElementChild.addEventListener('click', () => {
    console.log('clicked');
    window.open(article.url, '_blank');
  });
}

let navLinkCurrentActiveElement = null;

function onNavLinkClick(id) {
  fetchNews(id);

  const navItem = document.getElementById(id);
  navLinkCurrentActiveElement?.classList.remove('active');
  navLinkCurrentActiveElement = navItem;
  navLinkCurrentActiveElement.classList.add('active');
}

// Search function
const searchBtn = document.getElementById('search-button');

searchBtn.addEventListener('click', () => {
  const searchQuery = document.getElementById('search-query');
  console.log(searchQuery.value);

  fetchNews(searchQuery.value);
  searchQuery.value = '';

  navLinkCurrentActiveElement?.classList.remove('active');
  navLinkCurrentActiveElement = null;
});
