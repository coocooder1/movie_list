// app.js
// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
const app = express()
const port = 3000

// require handlebars in the project


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  
  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) =>{
  const movies = movieList.results.filter((movie) =>{
    return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', {movies: movies, keyword: req.query.keyword })
})

app.get('/movies/:movie_id', (req, res) => {  
  const movie = movieList.results.filter(function(movie){
   return movie.id == req.params.movie_id
  })
 
  res.render('show', { movie: movie[0] })
})




// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})