import express  from "express"; // hacer npm i express

import cors     from "cors";    // hacer npm i cors
import { resta, sumar, multiplicar, dividir, PI } from '../src/modules/matematica.js';
import{ OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from '../src/modules/omdb-wrapper.js';
import Alumno from '../src/models/alumno.js';

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
          res.status(200)
    
        }
    }
    else 
        
         res.status(400)

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


app.get("/matematica/multiplicar", (req, res) =>{

   const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
     
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Error: Ambos parámetros deben ser números.");
    }

  
    const resultado = multiplicar(n1, n2);

   
    res.status(200).send(resultado.toString());
});


app.get("/matematica/dividir", (req, res) =>{

   const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
     
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Error: Ambos parámetros deben ser números.");
    }

  
    const resultado = dividir(n1, n2);

   
    res.status(200).send(resultado.toString());
});


    app.get("/omdb-wrapper/searchbypage", async (req, res) =>{
try {
        // Primero: sacamos los datos de la URL (req.query)
        const search = req.query.search;
        const p      = req.query.p || 1;

        // Segundo: llamamos a la función
        let resultado = await OMDBSearchByPage(search, p);

        // Tercero: respondemos
        res.status(200).json(resultado);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error interno del servidor");
    }
    })

app.get("/omdb-wrapper/searchcomplete", async (req, res) => {
    const search = req.query.search;
    let envelope = { respuesta: false, cantidadTotal: 0, datos: [] };

    console.log("--- Iniciando búsqueda completa para:", search, "---");

    try {
        let todasLasPeliculas = [];
        let pagina = 1;
        let continuar = true;

        // Buscamos hasta 3 páginas para probar
        while (continuar && pagina <= 3) {
            console.log(`Pidiendo página ${pagina}...`);
            
            // ¡Asegúrate que este nombre de función sea el correcto en tu wrapper!
            const resultado = await OMDBSearchByPage(search, pagina);

            // LOG para ver qué responde la API realmente
            console.log(`Respuesta página ${pagina}:`, resultado ? "Datos recibidos" : "Sin datos");

            if (resultado && resultado.Search && resultado.Search.length > 0) {
                todasLasPeliculas = todasLasPeliculas.concat(resultado.Search);
                console.log(`Se sumaron ${resultado.Search.length} películas. Total actual: ${todasLasPeliculas.length}`);
                pagina++;
            } else {
                console.log("No hay más resultados o la propiedad 'Search' no existe.");
                continuar = false; 
            }
        }

        if (todasLasPeliculas.length > 0) {
            envelope.respuesta = true;
            envelope.datos = todasLasPeliculas;
            envelope.cantidadTotal = todasLasPeliculas.length;
        }

        res.status(200).json(envelope);

    } catch (ex) {
        console.error("ERROR CRÍTICO:", ex.message);
        res.status(500).json(envelope);
    }
});

app.get('/omdb-wrapper/getbyomdbid', async (req, res) => {
    // 1. Obtenemos el ID de la query string (?imdbID=tt12345)
    const imdbID = req.query.imdbID;

    // Estructura del envelope para un objeto único
    let envelope = {
        respuesta: false,
        cantidadTotal: 0,
        datos: {} // Objeto vacío por defecto
    };

    if (!imdbID) {
        return res.status(400).json(envelope);
    }

    try {
        // 2. Llamamos a la función del wrapper para un solo resultado
        const movie = await OMDBGetByImdbID(imdbID);

        // 3. Verificamos si la API encontró la película
        // OMDB suele devolver un objeto con la propiedad Response: "True"
        if (movie && movie.Response !== "False") {
            envelope.respuesta = true;
            envelope.cantidadTotal = 1;
            envelope.datos = movie;
            
            return res.status(200).json(envelope);
        }

        // Si no se encontró el ID, devolvemos 200 con el envelope vacío
        res.status(200).json(envelope);

    } catch (ex) {
        console.error("Error al obtener película por ID:", ex.message);
        res.status(500).json(envelope);
    }
});


const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido",   "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao",     "32623391", 18));


app.get('/alumnos', (req, res) => {
   
   
    res.status(200).json(alumnosArray);
});


app.get('/alumnos/:dni', (req, res) => {
   
   const dniBusqueda = req.params.dni;
   const alumnoEncontrado = alumnosArray.find(alumno => alumno.dni === dniBusqueda);
    if (alumnoEncontrado) {
        
        res.status(200).json(alumnoEncontrado);
    } else {
      
        res.status(404).send("Alumno no encontrado");
    }
});

app.post('/alumnos', (req, res) => {
   
   
    const { username, dni, edad } = req.body;

   
    if (!username || !dni || !edad) {
        return res.status(400).send("Faltan datos: se requiere username, dni y edad.");
    }

  
    const nuevoAlumno = new Alumno(username, dni, parseInt(edad));
    alumnosArray.push(nuevoAlumno);

  
    res.status(201).json(nuevoAlumno);
});

app.delete('/alumnos', (req, res) => {
   
    const { dni } = req.body;

   
    const index = alumnosArray.findIndex(alumno => alumno.dni === dni);

   
    if (index !== -1) {
       
        const alumnoEliminado = alumnosArray.splice(index, 1);
        
       
        res.status(200).json({
            mensaje: "Alumno eliminado con éxito",
            alumno: alumnoEliminado[0]
        });
    } else {
       
        res.status(404).send("No se encontró ningún alumno con ese DNI");
    }
});