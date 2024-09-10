const User = require("../models/user.model");

exports.signUp = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json({
			status: "success",
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({
				status: "fail",
				message: "user not found",
			});
		}
		if (user.password != password) {
			req.session.user = user;
			return res.status(404).json({
				status: "fail",
				message: "wrong username or password",
			});
		}

		return res.status(200).json({
			status: "success",
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
		});
	}
};
