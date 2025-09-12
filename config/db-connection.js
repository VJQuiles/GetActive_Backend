const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`Connection to ${mongoose.connection.name} successful.`))
    .catch((error) => {
        console.error(`DB Connection Error: ${error}`)
        process.exit(1)
    })

mongoose.connection.on('error', error => {
    console.error(`Error occurred during connection ${error}`)
})