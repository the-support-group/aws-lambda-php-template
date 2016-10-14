"use strict";

const spawn = require('child_process').spawn;
const stream = require('stream');

exports.handler = (event, context, callback) => {
	let php = null,
	    output = '',
	    error = '';
	
	// Update the process.env path to be relative to the Lambda runtime environment.
	process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];
	php = spawn('./php', ['index.php']);

	php.stdin.setEncoding = 'utf-8';
	php.stdin.write(JSON.stringify(event) + "\n");
	php.stdin.end();

	php.stdout.on('data', (data) => {
		output += data.toString();
	});

	php.stderr.on('data', (data) => {
		error += data.toString();
	});

	php.on('close', (code) => {
		if (code === 0) {
			// Success.
			context.succeed({'result' : output});
			callback(null, {'result' : output});
		} else {
			// Failure.
			let e = new Error(error);

			context.fail(e);
			callback(e);
		}
	});
}
