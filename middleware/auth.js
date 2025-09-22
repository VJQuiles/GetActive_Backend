// Authorization middleware. Token is sent via headers, is checked, and if there is a valid token, it is passed to the next part of the backend process. This function takes a request, and either sends back a response if there is an error, or moves to the next part of the process. In this app, that would be accessing the workout routes or accessing the exercise routes.

const jwt = require('jsonwebtoken')

function verifyUser(req, res, next) {
    try {
        let token = req.headers.authorization

        if (!token || !token.startsWith('Bearer ')) return res.status(401).json({ error: "Missing token or incorrect token format." })

        token = token.split(' ').pop().trim()

        const secret = process.env.JWT_SECRET
        const payload = jwt.verify(token, secret)

        req.user = payload.data

        next()

    } catch (error) {
        console.error(`Error occured during verification: ${error}`)
        res.status(401).json({ error: `Error occured during verification.` })
    }
}

module.exports = verifyUser