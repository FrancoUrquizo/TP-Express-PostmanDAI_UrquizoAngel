
import axios from "axios";
const APIKEY = "5b3538ac";
const BASE_URL = "http://www.omdbapi.com/?apikey=" + APIKEY
const OMDBSearchByPage = async (searchText, page = 1) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: []
  };

  try {
    let requestString = `${BASE_URL}&s=${searchText}&page=${page}`
    const apiResponse = await axios.get(requestString);


    if (apiResponse.data.Response === "True") {
      returnObject.respuesta = true;
      returnObject.cantidadTotal = (apiResponse.data.totalResults);
      returnObject.datos = apiResponse.data.Search;
    }
  } catch (error) {
    console.error("Error en la petición:", error);
  }

  return returnObject;



}
const OMDBSearchComplete = async (searchText) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : []};
let pagina= 1
for (let i = 0; i <= 8; i++)
{
let url  = 'http://www.omdbapi.com/?' + 'apikey=' + APIKEY + '&s=' + searchText  + '&page=' + pagina
let response = await axios.get(url)

if(response.data.Response === "True"){
    returnObject.respuesta = true;
    returnObject.cantidadTotal = response.data.totalResults;
 returnObject.datos = returnObject.datos.concat(response.data.Search);
}


pagina++
}


return returnObject;

};const OMDBGetByImdbID = async (imdbID) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : {}
};

let url  = 'http://www.omdbapi.com/?' + 'apikey=' + APIKEY + '&' + 'page=1'  + '&' + 'i=' + imdbID

let response = await axios.get(url)

if(response.data.Response === "True"){
    returnObject.respuesta = true;
    returnObject.datos = response.data;
}


return returnObject;
};

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID }