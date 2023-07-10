const Express = require('express');
const http = require('http');

const LED = require('./LED.js');
const router = require('./router.js');

const app = Express();
const server = http.createServer(app);

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use('/api', router);

server.listen(6969, () => console.log('\nHTTP backend server successfully launched!\n\nPress CTRL + C to exit.'));

// NOTE: Soft shutdown of LED strip and drivers when process is terminated
process.on('SIGINT', () => {
	console.log('\n\nPowering down LED strip and cleaning up drivers...\n');

	LED.terminate();
	process.nextTick(() => process.exit());
});
