let posterImage;

posterImage = document.getElementById('poster-image');


let tomatoPercent,
    tomatoAverage,
    tomatoReview,
    tomatoFresh,
    tomatoRotten;

tomatoPercent = document.getElementById('tomato-percent');
tomatoAverage = document.getElementById('tomato-average');
tomatoReview = document.getElementById('tomato-review');
tomatoFresh = document.getElementById('tomato-fresh');
tomatoRotten = document.getElementById('tomato-rotten');

let audiencePercent,
    audienceAverage,
    audienceRatings;

audiencePercent = document.getElementById('audience-percent');
audienceAverage = document.getElementById('audience-average');
audienceRatings = document.getElementById('audience-ratings');

let consensus,
    consensusMobile;

consensus = document.getElementById('consensus');
consensusMobile = document.getElementById('consensus-mobile');

let movieTitle,
    movieYear;

movieTitle = document.getElementById('movie-title');
movieYear = document.getElementById('movie-year');

let movieRequest = new XMLHttpRequest();
movieRequest.open('GET', 'http://localhost:8080/movies/771373077', true);

movieRequest.onload = function() {
  if (movieRequest.status >= 200 && movieRequest.status < 400) {
    let data = JSON.parse(movieRequest.responseText);
    posterImage.src = data.data.relationships.images.links.related;
    let tomatometer = data.data.attributes.tomatometer
    tomatoPercent.innerText = tomatometer.value + '%';
    tomatoAverage.innerText += ' ' + tomatometer.averageRating + '/10';
    let reviewCount = parseInt(tomatometer.freshCount) + parseInt(tomatometer.rottenCount);
    tomatoReview.innerText += ' ' + reviewCount;
    tomatoFresh.innerText += ' ' + tomatometer.freshCount;
    tomatoRotten.innerText += ' ' + tomatometer.rottenCount;

    consensus.innerHTML += data.data.attributes.consensus;
    consensusMobile.innerHTML += data.data.attributes.consensus;

    movieTitle.innerText = data.data.attributes.title;
    movieYear.innerText = '(' + data.data.attributes.year + ')';

    let audience = data.data.attributes.audience
    audiencePercent.innerText = audience.value + '%';
    audienceAverage.innerText += ' ' + audience.averageRating + '/10';
    audienceRatings.innerText += ' ' + audience.ratingsCount;

    
  } 
};

movieRequest.send();


let leftButton,
    rightButton,
    firstSet,
    secondSet;

leftButton = document.getElementsByClassName('CarouselButton__left');
rightButton = document.getElementsByClassName('CarouselButton__right');

firstSet = document.getElementById('first-set');
secondSet = document.getElementById('second-set');

Array.prototype.forEach.call(leftButton, function (element) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    firstSet.style.display = 'flex';
    secondSet.style.display = 'none';
  });
});
Array.prototype.forEach.call(rightButton, function (element) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    firstSet.style.display = 'none';
    secondSet.style.display = 'flex';
  });
});



let articleRequest = new XMLHttpRequest();
articleRequest.open('GET', 'http://localhost:8080/articles', true);

articleRequest.onload = function() {
  if (articleRequest.status >= 200 && articleRequest.status < 400) {
    let data = JSON.parse(articleRequest.responseText);
    let firstContainer = firstSet.getElementsByClassName('article-container');
    let secondContainer = secondSet.getElementsByClassName('article-container');
    for (let i = 0; i < 3; i += 1) {
      let img = document.createElement('img');
      firstContainer[i].appendChild(img);
      img.src = data[i].featured_image.source;
      img.className = 'article-img';

      let span = document.createElement('span');
      firstContainer[i].appendChild(span);
      span.className = 'article-desc';
      span.innerText = data[i].title;
    }
    for (let j = 3; j < 6; j += 1) {
      let img = document.createElement('img');
      secondContainer[j - 3].appendChild(img);
      img.src = data[j].featured_image.source;
      img.className = 'article-img';

      let span = document.createElement('span');
      secondContainer[j - 3].appendChild(span);
      span.className = 'article-desc';
      span.innerText = data[j].title;
    }
  } 
};

articleRequest.send();