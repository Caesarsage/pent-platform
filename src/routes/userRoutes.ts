import express, { Router } from 'express'
import { login, register } from '../controllers/userController'

const userRoute: Router = express.Router()

userRoute
  .route('/auth/login')
  .post(login)

userRoute
  .route('/auth/register')
  .post(register)

export default userRoute