
const express = require('express')
const app = express()
const port = 3000

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



app.get(['/search','/search/:data'], (req, res) => {
  //not null
  if(req.params.data!=null){
    res.send({status:200, message:"ok " +req.params.data})

  }else{
    res.send({status:500,error:true, message:"you have to provide a search" })
    //to set status https:500 in Network 
    //res.sendStatus(500 ).send("any things you want")
    
  }
});

app.get('/movies/add', (req, res) => {

})

app.get('/movies/read', (req, res) => {

  res.send({status:200, data:movies})
})

app.get('/movies/update', (req, res) => {

})

app.get('/movies/delete', (req, res) => {

})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

