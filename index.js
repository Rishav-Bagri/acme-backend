const express = require("express")
const cors = require("cors")
const app = express()

require("dotenv").config() // load .env file
const mainRouter = require("./routes/index")

app.use(cors())
app.use(express.json())

// main route
app.use("/api/v1", mainRouter)

// 404 handler
app.use((req, res) => {
    res.status(404).send("Not Found")
})

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke")
})

// dynamic port (important for Railway)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
