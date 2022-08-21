import express, { Router } from 'express'
import { createReview, fetchAllReviews, getSingleReview, updateReview, updateVisitorRatingCount, deleteReview } from '../controllers/reviewController'
import { authenticateUser,} from '../middleware/auth'
import { isReviewOwner } from '../middleware/isAuthor'

const reviewsRoute: Router = express.Router()

reviewsRoute.post('/review', authenticateUser,createReview )

reviewsRoute.route('/reviews')
  .get(fetchAllReviews)

reviewsRoute.route('/review/:id')
  .get(getSingleReview)
  .put(authenticateUser, isReviewOwner, updateReview)
  .delete(authenticateUser, isReviewOwner, deleteReview)

reviewsRoute.patch('/review/:id/visitor', updateVisitorRatingCount)

export default reviewsRoute