"use strict";

var spawn = require('child_process').spawn
var stream = require('stream')

exports.handler = function( event, context ) {

	var php =spawn('./php', ['index.php'])
	php.stdin.setEncoding = 'utf-8';
	php.stdin.write(JSON.stringify(event) + "\n")
	php.stdin.end()

	php.stdout.on('data', function (data) {
		console.log( data.toString() );
	});

	php.stderr.on('data', function (data) {
		console.log( data.toString() );
	});

	php.on('exit', function (code) {
  		console.log('child process exited with code ' + code);
		context.done()
	});
}

