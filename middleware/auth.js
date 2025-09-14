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