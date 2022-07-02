const express = require('express');
const requestIp = require('request-ip');
const path = require('path');
require('dotenv').config({
	path: path.resolve(__dirname, '../.env'),
});

const app = express();
app.use(express.json());
app.use(requestIp.mw());

app.post('/F3S6dHe5dMX9gbN47PgE7TmqTsLzLebP', (req, res) => {
	try {
		const ip = req.clientIp;
		const { X_API_KEY } = req.headers;

		if (ip !== process.env.IP || X_API_KEY !== process.env.X_API_KEY) {
			return res.status(200).send({
				message: 'Forbidden',
			});
		}

		res.send(req.body);
	} catch (error) {
		console.log(error);
	}
});

const PORT = 3350;

app.listen(PORT, () => {
	console.log(`server is listening at port ${PORT}`);
});
