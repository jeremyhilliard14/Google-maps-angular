var connect = require('connect');
var servStatic = require('serve-static');
connect().use(servStatic(__dirname)).listen(8001, function(){
	console.log('Listening on port 8001...');
});