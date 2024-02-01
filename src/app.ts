import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())

// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users', usersRouter)

// Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Server running on port 5000')
})

export default app
