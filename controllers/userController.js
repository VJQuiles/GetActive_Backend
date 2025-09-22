//Controller to handle User routes. 

const User = require('../models/User')
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET
const expiration = '1h'

// Function to register a user. Uses the email to check if they already exist, if so, an error is returned. If not, a new user is created, and a jwt is created to allow a access to the user dashboard. Sends the user information as the payload.
async function registerUser(req, res) {
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) return res.status(400).json({ error: 'User already exists' })

        const newUser = await User.create(req.body)

        const payload = {
            _id: newUser.id,
            username: newUser.username,
            email: newUser.email
        }

        jwt.sign(
            { data: payload },
            secret,
            { expiresIn: expiration },
            (error, token) => {
                if (error) throw error
                return res.status(200).json({ token, user: payload })
            }
        )
    } catch (error) {
        console.error(`Error registering user: ${error}`)
        return res.status(400).json({ error: "Error registering user" })
    }
}

// Function to log in user. Checks the password given to authenticate the user and issue a token for access to user workouts and exercises. Uses the email entered from the request body to locate the user. 
async function loginUser(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({ message: "*Looks at id*, *looks at you* Nah, get outta here" })

        const correctPassword = await user.isCorrectPassword(req.body.password)
        if (!correctPassword) return res.status(400).json({ error: "Hmm that's not quite right" })

        const payload = {
            _id: user.id,
            username: user.username,
            email: user.email
        }

        jwt.sign(
            { data: payload },
            secret,
            { expiresIn: expiration },
            (error, token) => {
                if (error) throw error
                return res.status(200).json({ token, user: payload })
            }
        )

    } catch (error) {
        console.error(`Error logging in: ${error}`)
        return res.status(400).json({ error: "Error logging in" })
    }
}

module.exports = {
    registerUser,
    loginUser
}