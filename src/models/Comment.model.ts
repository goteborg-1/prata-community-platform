import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({

  postId: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  isAnonymous: {
    type: Boolean,
    required: true
  },

  likedBy: {
    type: [String],
    default: []
  },

  isPsychologist: {
    type: Boolean,
    default: false
  },

  isEdited: {
    type: Boolean,
    default: false
  }

}, { timestamps: true }) // auto adds timestamps