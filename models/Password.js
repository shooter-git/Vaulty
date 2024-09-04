import mongoose from 'mongoose'

const PasswordSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please provide a description for this password'],
    maxlength: [100, 'Description cannot be more than 100 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

// Update the 'updatedAt' field on save
PasswordSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

// Don't return the password field when converting to JSON
PasswordSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password
    return ret
  }
})

export default mongoose.models.Password || mongoose.model('Password', PasswordSchema)