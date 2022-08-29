export const imgExist = (article) => {
  const urlImage = `https://www.nytimes.com/${article.multimedia[0]?.url}`;
  const isUndefined = urlImage.includes('undefined');
  if(isUndefined){
    return 'https://farm5.staticflickr.com/4363/36346283311_74018f6e7d_o.png'
  } else{
    return urlImage
  }
}


export const imgExist2 = (article) => {

  const existImg = article?.ImageUrl;
  if(existImg == "" || existImg == undefined){
   
    return 'https://farm5.staticflickr.com/4363/36346283311_74018f6e7d_o.png'
  } else {
    return article?.ImageUrl
  }
};