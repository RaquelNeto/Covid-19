const jwt = require('jsonwebtoken')




 const sessionMiddleware = (req, res, next) => {
 	const sessionStr = req.headers.authorization;
	 
 	try {
 		if (sessionStr) {
 			const user = jwt.verify(sessionStr, process.env.TOKEN_SECRET);
 			req.user = user
 		} else {
 			req.user = null
 		}
 	} catch(e) {
		
 		req.user = null
 	}
 	next()
 }

module.exports = sessionMiddleware
