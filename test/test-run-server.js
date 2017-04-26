/**
 * Test with Mocha
 */
var http = require('http');
var assert = require('assert');


var server = require('../app/server.js');

describe('Run serveur', function () {

	//Request get
	it('Test request get', function (done) {
		http.get('http://localhost:3000/api/data', function (res) {
			assert.equal(res.statusCode, 200);
			done();
		});
	});

	//Request post
	it('Test request post', function (done) {

		var post_data = '{"id": "TEST","start": {"lat": 49.15,"lng": -0.32},"end": {"lat": 49.07,"lng": -0.30}}';

		var options = {
			hostname: 'localhost',
			port: '3000',
			path: '/api/data/addData',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(post_data)
			}
		};

		var post_req = http.request(options, function (res) {
			res.setEncoding('utf8');
			res.on('data', function (res) {
				console.log(res);
				assert.equal(res, "ok addData");
				done();
			});
		});


		// Envoi des données
		post_req.write(post_data);
		post_req.end();
	});

	//Request delete
	it('Test request delete', function (done) {

		var delete_data = '{"id": "TEST"}';

		var options = {
			hostname: 'localhost',
			port: '3000',
			path: '/api/data/deleteData',
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(delete_data)
			}
		};

		var delete_req = http.request(options, function (res) {
			res.setEncoding('utf8');
			res.on('data', function (res) {
				console.log(res);
				assert.equal(res, "ok deleteData");
				done();
			});
		});

		//Send data
		delete_req.write(delete_data);
		delete_req.end();
	});
	
	//Request delete (Error)
	it('Test request delete (Error)', function (done) {

		var delete_data = '{"id": "TEST"}';

		var options = {
			hostname: 'localhost',
			port: '3000',
			path: '/api/data/deleteData',
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(delete_data)
			}
		};

		var delete_req = http.request(options, function (res) {
			res.setEncoding('utf8');
			res.on('data', function (res) {
				console.log(res);
				assert.equal(res, "error deleteData - data not exist");
				done();
			});
		});

		//Send data
		delete_req.write(delete_data);
		delete_req.end();
	});
});
