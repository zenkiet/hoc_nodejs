import express from 'express'
import {print, type} from './app/helpers/print.js'
import * as dotenv from 'dotenv'
dotenv.config()
import { usersRouter, studentsRouter } from './app/routes/index.js'
import MongoDB from './app/utils/mongodb.util.js'
import { Exception }  from './app/errors/index.js'

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

// routers
app.use('/users', usersRouter)
app.use('/students', studentsRouter)

const startServer = async() => {
  try {
      await MongoDB.connect(process.env.MONGODB_URI);
      print('Connected to MongoDB', type.SUCCESS)
      
      app.listen(PORT, () => {
          print(`Server is running on port ${PORT}`, type.SUCCESS)
      })
  } catch (error) {
      const {code} = error
      if(code == 8000){
        throw new Exception(Exception.DB_USERNAME_PASSWORD)
      } else if(code == 'ENOTFOUND'){
        throw new Exception(Exception.DB_CONNECTION_STRING)
      }
      throw new Exception(Exception.DB_CONNECTION)
  }
}

startServer()
