const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.Secret_key);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token is not valid" });
    }
}

module.exports = auth;