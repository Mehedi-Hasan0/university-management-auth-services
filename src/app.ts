import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(cors())

// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Server running on port 5000')
})

export default app
