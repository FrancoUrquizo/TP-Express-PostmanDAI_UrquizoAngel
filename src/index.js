import express  from "express"; // hacer npm i express

import cors     from "cors";    // hacer npm i cors
import { resta, sumar, multiplicar, dividir, PI } from '../src/modules/matematica.js';

const app  = express();

const port = 3000;              // El puerto 3000 (http://localhost:3000)


// Agrego los Middlewares

app.use(cors());         // Middleware de CORS

app.use(express.json()); // Middleware para parsear y comprender JSON


//

// Aca pongo todos los EndPoints

//

app.get('/', (req, res) => {                // EndPoint "/"

    res.send('Ya estoy respondiendo!');

})


app.get('/saludar/:nombre', (req, res) => {             // EndPoint "/saludar"

    res.send('Hola' + req.params.nombre)


})


app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {             // EndPoint "/saludar"

   if(isNaN (req.params.ano) || isNaN (req.params.mes) || isNaN (req.params.dia))
    {

      if ( Date.parse (`${req.params.ano}-${req.params.mes}-${req.params.dia}`))
        {
           res.send(200)
    
        }
    }
    else 
        
        res.send(400)

})
 
//

// Inicio el Server y lo pongo a escuchar.

//

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})

app.get("/matematica/sumar", (req, res) =>{

   const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

   
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Error: Ambos parámetros deben ser números.");
    }

  
    const resultado = sumar(n1, n2);

   
    res.status(200).send(resultado.toString());
});

app.get("/matematica/resta", (req, res) =>{

   const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
     
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Error: Ambos parámetros deben ser números.");
    }

  
    const resultado = resta(n1, n2);

   
    res.status(200).send(resultado.toString());
});