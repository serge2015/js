let movies;

async function renderMovies(filter) {
  document.querySelector(".purple").innerText = `${filter}`
  const moviesWrapper = document.querySelector(".movies");
  moviesWrapper.classList += " movies__loading"

  if (!movies) {
    movies = await getMovies(filter, moviesWrapper);
  }
  
  moviesWrapper.classList.remove("movies__loading")
}

function filterMovies(event) {
  renderMovies(event.target.value)
}

async function getMovies(filter, moviesWrapper) {
    const movies = await fetch(`http://www.omdbapi.com/?apikey=4cfe7eb4&s=${filter}`)
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
