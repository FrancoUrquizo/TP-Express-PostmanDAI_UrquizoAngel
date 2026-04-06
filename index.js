import express from "express";     // Hacer npm i express

const app  = express();
const port = 3000;

app.get('/', (req, res) => {        // EndPoint "/", verbo GET
  res.send('Hello World!');
})

app.listen(port, () => {   // Inicio el servidor WEB (escuchar)
  console.log(`Listening on http://localhost:${port}`)
})