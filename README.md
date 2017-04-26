# node-simple-rest-api

Node.js 

Simple Rest server with Express 

(GET/POST/DELETE)

# Launch

(npm install)

npm start

npm test

# Use

curl -X GET http://localhost:3000/api/data

curl -H "Content-Type: application/json" -X POST -d '{"id": "TEST","start": {"lat": 49.15,"lng": -0.32},"end": {"lat": 49.07,"lng": -0.30}}' http://localhost:3000/api/data/addData

curl -H "Content-Type: application/json" -X DELETE -d '{"id": "TEST"}' http://localhost:3000/api/data/deleteData




