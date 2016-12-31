#!/usr/bin/env node
const browserifyNodeModules = require('./moduleBrowserifyer');

module.exports = function(dependencies) {
	var browserified = false; 
	browserifyNodeModules(dependencies)
	.on('finish', res => {
		browserified = true;
		console.log('\nbrowserified');
	})
	.on('error', () => {
		throw new Error('Failed to browserify the node modules');
	});

	function wait() {
		if(!browserified) {
			setTimeout(() => { process.stdout.write(".");; wait(); }, 1000);
		}
	}
	wait();
}
