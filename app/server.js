/*
* Server - Simple API REST
*/

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var server = express();

const urlServer = "localhost";
const port = 3000;

//Data File json
const linkJson = "data.json";
//Verify if file exist
require('../' + linkJson);

server.use(bodyParser.json());
server.use(function (req, res, next) {
  //Gestion CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});

/*
* API REST(GET) - Get all
* curl -X GET http://localhost:3000/api/data
*/
server.get('/api/data', function (req, res) {
  //Send data JSON
  var donnees = fs.readFileSync(linkJson);
  res.status(200).json(JSON.parse(donnees));
  
});

/*
* API REST(POST) - Insert data
*
* Tests POST :
* -OK-
* curl -H "Content-Type: application/json" -X POST -d '{"id": "TEST","start": {"lat": 49.15,"lng": -0.32},"end": {"lat": 49.07,"lng": -0.30}}' http://localhost:3000/api/data/addData
* -Error-
* curl -H "Content-Type: application/json" -X POST -d '{"start": {"lat": 49.15,"lng": -0.32},"end": {"lat": 49.07,"lng": -0.30}' http://localhost:3000/api/data/addData
*/
server.post('/api/data/addData', function (req, res) {
  //Verify request
  if (req.body.id === undefined || req.body.id === '' ||
    req.body.start.lat === undefined ||
    req.body.start.lng === undefined ||
    req.body.end.lat === undefined ||
    req.body.end.lng === undefined) {
    res.status(400);
    res.setHeader('Content-Type', 'text/plain');
    res.end("error addData");
  } else {
    try {
      //Read request Json
      var reqJson = JSON.parse(JSON.stringify(req.body));

      //Read file
      var donnees = fs.readFileSync(linkJson);
      var donneesJson = JSON.parse(donnees);

      //add data 
      donneesJson.data.push(reqJson);

      //Write file
      fs.writeFileSync(linkJson, JSON.stringify(donneesJson));

      res.status(200);
      res.setHeader('Content-Type', 'text/plain');
      res.end("ok addData");
    } catch (e) {
      res.status(500);
      res.setHeader('Content-Type', 'text/plain');
      res.end("error addData");
    }
  }
});

/*
* API REST(DELETE) - Delete data
*
* Tests Delete :
* -OK-
* curl -H "Content-Type: application/json" -X DELETE -d '{"id": "TEST"}' http://localhost:3000/api/data/deleteData
* -Error-
* curl -H "Content-Type: application/json" -X DELETE -d '{"id": ""}' http://localhost:3000/api/data/deleteData
* curl -H "Content-Type: application/json" -X DELETE -d '' http://localhost:3000/api/data/deleteData
*/
server.delete('/api/data/deleteData', function (req, res) {
  var reqJson = req.body.id;

  //Verify request
  if (reqJson === undefined || reqJson === null || reqJson === '') {
    res.status(400);
    res.setHeader('Content-Type', 'text/plain');
    res.end("error deleteData - request error");
  } else {
    try {
      //Delete one element
      var rslt = deleteData(reqJson);
      if (rslt) {
        res.status(200);
        res.setHeader('Content-Type', 'text/plain');
        res.end("ok deleteData");
      } else {
        res.status(400);
        res.setHeader('Content-Type', 'text/plain');
        res.end("error deleteData - data not exist");
      }
    } catch (e) {
      res.status(500);
      res.setHeader('Content-Type', 'text/plain');
      res.end("error deleteData");
    }

  }
});

/*
* Delete one element 
*
* @see linkJson
* @param {string} idCoord
* @return {Boolean}
*
*/
function deleteData(idCoord) {
  //Lecture du fichier Json data
  var donnees = fs.readFileSync(linkJson);
  var donneesJson = JSON.parse(donnees);

  //Vérifie si les coordonnées existe
  var flagElm = -1;
  for (var int = 0; int < donneesJson.data.length; int++) {
    if (donneesJson.data[int].id === idCoord) {
      flagElm = int;
      break;
    }
  }

  if (flagElm > -1) {
    //Supprime l'élément
    donneesJson.data.splice(flagElm, 1);
    fs.writeFileSync(linkJson, JSON.stringify(donneesJson));
    return true;
  } else {
    return false;
  }
}

server.listen(port, function () {
  console.log(`Server listening at http://${urlServer}:${port}/api/data`);
});
