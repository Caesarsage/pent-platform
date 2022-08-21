import { NextFunction, Response } from "express"
import { Review } from "../model/reviewModel"
import { iUserAuthInfoRequest } from "../utils/customRequest"
import { ErrorResponse } from "../utils/expressError"

export const isReviewOwner = async (request: iUserAuthInfoRequest, response: Response, next: NextFunction) => {
  const { id } = request.params
  const reviews = await Review.findById(id)
  if (!reviews) {
    return next(new ErrorResponse('No review found', 404))
  }

  console.log(request.user)
  console.log(request.user.id === reviews.owner.toString())
  if (request.user.id !== reviews.owner.toString()) {
    return next(new ErrorResponse('Not authorized to update this review', 401))
  }
  next()
}