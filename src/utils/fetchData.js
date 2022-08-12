const API_KEY = 'bd9yKXc1WKy8astDb9bF2AONEooK4eGb';

//Url base
//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey

export const getPostsByTag = async (tag) => {
  const URL_API = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:(${tag})&api-key=${API_KEY}`;
  const response = await fetch(URL_API);
  const data     = await response.json();
  return data;
}