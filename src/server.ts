import express, {Application, NextFunction, Request, Response} from 'express'
import { ErrorResponse } from './utils/expressError'
import  cors from 'cors'
import { db } from './db/db'
import { readConfig }from './config'
import errorHandler from './utils/error'
import userRoute from './routes/userRoutes'
import reviewsRoute from './routes/reviewsRoute'

const middleware = (app: Application) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())
}

const setupRoute = (app: Application) => {
  app.get('/', async (request: Request , response: Response) => {
    await response.json({ message: 'Welcome to Pent api that allows you to give reviews about your previous stayed apartment to help others!!'})
  })

  app.use('/api', [userRoute, reviewsRoute])

  app.all('*', (request : Request, response: Response, next : NextFunction ) => {
    next(new ErrorResponse('Page not found', 404))
  })

  app.use(errorHandler)
}

export const startServer = () => {
  const app: Application = express()
  db(readConfig)

  middleware(app)

  setupRoute(app)
  return app
}
