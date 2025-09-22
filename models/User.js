const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username required"],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email required"],
            unique: true,
            match: [/.+@.+\..+/, "You must enter a valid email format(user@example.com)"]
        },
        password: {
            type: String,
            required: [true, "Password required"],
            unique: true
        }
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password
                delete ret.__v
                return ret
            },
        },
    }
)

// Function to salt the password entered by the user.
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next()
})

// Function to verify the password entered by the user. 
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

// In the event of a put or patch, this will automatically run the validators, in the even the validators dont run automatically.
mongoose.set('runValidators', true)

const User = mongoose.model("User", userSchema)

module.exports = User