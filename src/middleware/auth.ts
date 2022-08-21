import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { readConfig } from "../config"
import { iUserAuthInfoRequest } from "../utils/customRequest"



export const authenticateUser = async (request: iUserAuthInfoRequest , response : Response, next: NextFunction) => {
  try {
    // check if there is an authorization token
    if (!request.headers.authorization) {
      return response.status(401).json({ message: "authorization header required" })
    }
    const splittedHeader = await request.headers.authorization.split(" ")
    if (splittedHeader[0] !== "Bearer") {
      return response
        .status(401)
        .json({ message: "authorization format is Bearer <token>" })
    }
    const token = await splittedHeader[1]
    // decode user
    const userToken = jwt.verify(token, readConfig.JWT_SECRET)
    if (!userToken)
      return response
        .status(403)
        .json({ message: "Invalid authorization token, please login" })
    // allow to continue with request
    request.user = userToken
    next()
  } catch (error) {
    response.status(501).json({ message: "error, bad request.", err: error })
  }
}