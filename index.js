let movies;
let selectedMovies;
let oldTargetValue;
let filter;

function openMenu() {
  document.body.classList += "menu--open"
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}


async function renderMovies(filter) {
  document.querySelector(".purple").innerText = `${filter}`
  const moviesWrapper = document.querySelector(".movies");
  moviesWrapper.classList += " movies__loading"
  if (!movies) {
    movies = await getMovies(filter, moviesWrapper);
  }
  moviesWrapper.classList.remove("movies__loading")
  return filter
}

async function getMovies(filter, moviesWrapper) {
    const movies = await fetch(`https://www.omdbapi.com/?apikey=4cfe7eb4&s=${filter}`)
    const moviesData = await movies.json()
    selectedMovies = moviesData.Search.slice(0, 6)
    moviesWrapper.innerHTML = selectedMovies.map((movie) => moviesHTML(movie)).join("")
}   

function moviesHTML(movie) {
        return `<div class="movie">
          <figure class="movie__img--wrapper">
            <img class="movie__img" src="${movie.Poster}" alt="">
          </figure>
          <div class="movie__title">
          ${movie.Title}
          </div>
          <div class="movie__year">
          ${movie.Year}
          </div>
          
        </div>`
}

function filterMovies(filter, event) {
  if (!!oldTargetValue) {
    document.querySelector(".purple").innerText = `${filter}`
  }
  oldTargetValue = event.target.value
  document.querySelector(".purple").innerText += `, ${event.target.value}`
  const moviesWrapper = document.querySelector(".movies");
  if (event.target.value === "new to old") {
    selectedMovies.sort((a, b) => b.Year - a.Year)
  }
  else if (event.target.value === "old to new") {
    selectedMovies.sort((a, b) => a.Year - b.Year)
  }
  document.getElementById("order").value = ""
  moviesWrapper.innerHTML = selectedMovies.map((movie) => moviesHTML(movie)).join("")
  return oldTargetValue
}
