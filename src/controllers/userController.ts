import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { readConfig } from '../config'
import { User } from '../model/userModel'
import { ErrorResponse } from '../utils/expressError'
import bcrypt from 'bcryptjs'

// const matchPasswords = async function (password: any, hashPassword: any) {
//   return await bcrypt.compare(password, hashPassword)
// }

export const register = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { gender, email, password, username, firstName, lastName } = request.body
    const user = await User.findOne({ username })
    const userEmail = await User.findOne({ email })
    if (user) {
      return next(new ErrorResponse('Username already exists', 400))
    }
    if (userEmail) {
      return next(new ErrorResponse('Email already exists', 400))
    }
    const newUser = await User.create({
      email,
      username,
      firstName,
      lastName,
      password,
      gender
    })
    if (!newUser) {
      return next(new ErrorResponse('Error creating user', 500))
    }
    const token = await jwt.sign({ id: newUser._id, username: newUser.username }, readConfig.JWT_SECRET, { expiresIn: "1h" })
    response.status(201).json({ message: "User created successfully", token })
  } catch (error) {
    next(error)
  }
}


export const login = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { username, password } = request.body
    const user = await User.findOne({ username }).select('+password')
    const userToFrontend = await User.findOne({ username }).select('-password')
    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401))
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username
      },
      readConfig.JWT_SECRET,
      { expiresIn: readConfig.JWT_EXPIRY }
    )
    if (token)
      return response
        .status(200)
        .json({ msg: 'login successfully', data: userToFrontend, token })
  } catch (error) {
    console.log(error)
    next(error)
  }
}