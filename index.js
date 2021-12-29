
const express = require('express')
const app = express()
const port = 3000



app.get('/', (req, res) => {
  res.send('Ok!')
})

app.get('/test', (req, res) => {
  res.send({status:200, message:"ok"})
})

let date = new Date();

app.get("/time", (req, res) => {
  res.send({status:200,message: date.getHours() + ":" + date.getSeconds()
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

