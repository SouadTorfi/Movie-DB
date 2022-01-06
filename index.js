
const express = require('express')
const req = require('express/lib/request')
const app = express()
const port = 3002

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }

]


app.get('/', (req, res) => {
  res.send('Ok!')
})

app.get('/test', (req, res) => {
  res.send({ status: 200, message: "ok" })
})

let date = new Date();

app.get("/time", (req, res) => {
  res.send({
    status: 200, message: date.getHours() + ":" + date.getSeconds()
  });
});

app.get('/hello/:id', (req, res) => {

  res.send({ status: 200, message: "Hello " + req.params.id })

})
app.get('/hello/', (req, res) => {

  res.send({ status: 200, message: "Hello " + "Unknow" })

})



app.get(['/search', '/search/:data'], (req, res) => {
  //not null
  if (req.params.data != null) {
    res.send({ status: 200, message: "ok " + req.params.data })

  } else {
    res.send({ status: 500, error: true, message: "you have to provide a search" })
    //to set status https:500 in Network 
    //res.sendStatus(500 ).send("any things you want")

  }
});


app.get('/movies/read', (req, res) => {

  res.send({ status: 200, data: movies })
})

app.get('/movies/read/by-date', (req, res) => {

  let result = movies.sort(function (a, b) {

    return a.year - b.year
  })

  res.send({ status: 200, data: result })
})

app.get('/movies/read/by-rating', (req, res) => {


  let result = movies.sort(function (a, b) {

    return b.rating - a.rating
  })

  res.send({ status: 200, data: result })
})

app.get('/movies/read/by-title', (req, res) => {


  let result = movies.sort(function (a, b) {


    return a.title.localeCompare(b.title)
  })

  res.send({ status: 200, data: result })
})


app.get('/movies/read/id/:id', (req, res) => {

  if (req.params.id) {
    if ((req.params.id) >= 0 && req.params.id < movies.length) {
      res.send({ status: 200, data: movies[req.params.id] })
    }
    else {
      res.send({ status: 404, error: true, message: 'the movie ' + req.params.id + ' does not exist' })

    }
  }

})


app.get("/movies/add", (req, res) => {
  const title = req.query.title;
  const year = req.query.year;
  const rating = req.query.rating;


  if (title == null || isNaN(year) || isNaN(rating) || typeof year === "undefined" || year.toString().length != 4) {
    res.send({ status: 403, error: true, message: "you cannot create a movie without title and a year" });
  }
  else if (rating == "" || typeof rating === "undefined") {
    let l = 4;
    movies.push({ title: title, year: year, rating: l });
    res.send(movies);
  }

  movies.push({ title: title, year: Number(year), rating: Number(rating) });
  res.send({ status: 200, data: movies });

});

app.get('/movies/update/:id', (req, res) => {
  const Title = req.query.title;
  const Year = req.query.year;
  const Rating = req.query.rating;
  var Index = parseInt(req.params.id)
  if (Title != undefined) {

    movies[Index].title = Title;
  }
  if (Year == "") {

    movies[Index].year = Year;
  }
  if (Rating != undefined) {

    movies[Index].rating = Number(Rating);
  }

  res.send({ status: 200, data: movies });
})

app.get('/movies/delete/id/:id', (req, res) => {



  if (req.params.id) {
    if ((req.params.id) >= 0 && req.params.id < movies.length) {
      var Index = parseInt(req.params.id)
      // var Index = movies.indexOf([req.params.id]);

      movies.splice(Index, 1);

      res.send({ status: 200, data: movies })
    }
    else {
      res.send({ status: 404, error: true, message: 'the movie ' + req.params.id + ' does not exist' })

    }
  }


})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

