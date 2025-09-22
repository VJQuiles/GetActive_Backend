const mongoose = require('mongoose')

//Connection to database. Alerts when successful, disconnects when not. 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`Connection to ${mongoose.connection.name} successful.`))
    .catch((error) => {
        console.error(`DB Connection Error: ${error}`)
        process.exit(1)
    })

//Disconnects if there is an error during the connection. 
mongoose.connection.on('error', error => {
    console.error(`Error occurred during connection ${error}`)
})