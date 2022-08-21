import { model, Schema } from 'mongoose'

interface iReview {
  image: string
  video: string
  apartmentName: string
  comments: object
  rating: number
  visitorRatingCount: number
  owner: Schema.Types.ObjectId
}

const reviewSchema = new Schema <iReview> ({
  image : {
    type : String,
  },
  video: {
    type: String,
  },
  apartmentName : {
    type: String,
    required: [true, 'Please provide an apartment name']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating']
  },
  visitorRatingCount: {
    type: Number,
    default: 0
  },
  comments: {
    landlord: {
      type: String,
      required: [true, 'Please provide a comment about the landlord']
    },
    environment: {
      type: String,
      required: [true, 'Please provide a comment about the environment']
    },
    amenitiesQuality: {
      type: String,
      required: [true, 'Please provide a comment about the amenities quality']
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true
})

export const Review = model('Review', reviewSchema)