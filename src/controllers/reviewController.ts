import { Response, Request, NextFunction } from 'express'
import { Review } from '../model/reviewModel'
import { iUserAuthInfoRequest } from '../utils/customRequest'
import { ErrorResponse } from '../utils/expressError'

export const createReview = async (request: iUserAuthInfoRequest, response: Response, next: NextFunction) => {
  try {
    const { image ="", video="", apartmentName, comments, rating} = await request.body
    const review = new Review({
      image,
      video,
      apartmentName,
      rating,
      comments: {
        landlord : comments.landlord,
        environment: comments.environment,
        amenitiesQuality: comments.amenitiesQuality
      }
    })
    const user = request.user.id
    review.owner = user
    if (!user) {
      return next(new ErrorResponse('Please login to create a review', 401))
    }
    if (!review) {
      return next(new ErrorResponse('Review not created', 400))
    }
    await review.save()
    response.status(201).json({
      data: review,
      message: 'Review created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const updateVisitorRatingCount = async (request: iUserAuthInfoRequest, response: Response, next: NextFunction) => {
  try {
    const isHelpfulCount: number = request.body.helpful
    const id = request.params.id

    const review = await Review.findByIdAndUpdate(id, {
      $inc: {
        visitorRatingCount: isHelpfulCount
      }
    }, {new: true})
    if (!(isHelpfulCount === 1 || isHelpfulCount === 0)) {
      return next(new ErrorResponse('Please provide a valid value of 0 or 1', 400))
    }
    if (!review) {
      return next(new ErrorResponse('Review not found', 404))
    }
    return response.json({data: review, message: 'successful' })
  } catch (error) {
    next(error)
  }
}

export const fetchAllReviews = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const page: number = parseInt(request.query.page as string) || 1
    const limit: number = parseInt(request.query.limit as string) || 10
    const sort = request.query.sort

    const skip: number = (page - 1) * limit
    let allReviews
    if (sort === 'visitRating') {
      allReviews = await Review.find({}).limit(limit * 1).skip(skip).sort({ 'visitorRatingCount': -1 }).populate('owner')
    } else {
      allReviews = await Review.find({}).limit(limit * 1).skip(skip).sort({ $natural: -1 }).populate('owner')
    }
    if (!allReviews) {
      return next(new ErrorResponse('No Reviews found', 404))
    }
    return response.json({
      data: allReviews,
      message: 'all reviews found'
    })

  } catch (error) {
    return next(error)
  }
}


export const getSingleReview = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = await request.params || request.body
  try {
    const review = await Review.findById(id).populate('owner')

    if (!review) {
      return next(new ErrorResponse('No review found', 404))
    }

    return response.json({
      data: review,
      message: 'Single review found'
    })

  } catch (error) {
    return next(error)
  }
}

export const updateReview = async (request: Request, response: Response, next : NextFunction) => {
  const { image, video, apartmentName, rating, landlord, environment, amenitiesQuality } = await request.body
  const { id } = await request.params
  try {
    const body = {
      image,
      video,
      apartmentName,
      rating,
      comments: {
        landlord,
        environment,
        amenitiesQuality
      }
    }

    const review = await Review.findByIdAndUpdate(id, body, {new: true})

    if (!review) {
      return next(new ErrorResponse('No review found', 404))
    }

    return response.json({
      data: review,
      message: 'review updated'
    })

  } catch (error) {
    return next(error)
  }
}

export const deleteReview = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = await request.params
  try {
    const review = await Review.findByIdAndDelete(id)

    if (!review) {
      return next(new ErrorResponse('No review found', 404))
    }

    return response.json({
      message: 'Review Deleted successfully'
    })
  } catch (error) {
    return next(error)
  }
}