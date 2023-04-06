import express from 'express'
import * as dotenv from 'dotenv'
import { usersRouter, studentsRouter } from './app/routes/index.js'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

// routers
app.use('/users', usersRouter)
app.use('/students', studentsRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
