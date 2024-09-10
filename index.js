const express = require("express");
const mongoose = require("mongoose");
const mongoConfig = require("./config/config.js");
const cors = require('cors');
// const session = require("express-session");
// const redis = require("redis");
// const RedisStore = require('connect-redis')(session);
// let redisClient = redis.createClient({
// 	host: 'redis',
// 	port: 6379,
// });

const postRouter = require("./routes/post.route.js");
const userRouter = require("./routes/user.route.js");

const app = express();
const port = process.env.PORT || 3000;

const connectWithRetry = () => {
	mongoose
		.connect(
			`mongodb://${mongoConfig.MONGO_USER}:${mongoConfig.MONGO_PASSWORD}@${mongoConfig.MONGO_IP}:${mongoConfig.MONGO_PORT}/?authSource=admin`
		)
		.then(() => {
			console.log("Successfully connected to DB");
		})
		.catch((error) => {
			console.log(error);
			setTimeout(connectWithRetry, 5000);
		});
};

connectWithRetry();

app.enable('trust proxy');
app.use(cors({}));

// app.use(
// 	session({
// 		store: new RedisStore({ client: redisClient }),
// 		secret: mongoConfig.SESSION_SECRET,
// 		cookie: {
// 			secure: false,
// 			resave: false,
// 			saveUninitialized: false,
// 			httpOnly: true,
// 			maxAge: 30000,
// 		},
// 	})
// );

app.use(express.json());

app.get("/api", (req, res) => {
	res.send("<h2>Hi there !!!!!</h2>");
	console.log('yeah it ran');
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => console.log(`listening on port ${port}...`));
