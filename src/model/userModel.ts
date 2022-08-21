// User in this sense can be tutor or admin

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema } = mongoose

interface iUser {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
  gender: string
}

const UserSchema = new Schema<iUser>({
  firstName: {
    type: String,
    required: [true, 'Please provide a Firt name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a Last name'],
  },
  gender: {
    type: String,
    required: [true, 'Please provide a gender'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please provide a valid mail',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
  },
})

UserSchema.pre('save', async function (next) {
  // if password not modified
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

export const User = mongoose.model('User', UserSchema)