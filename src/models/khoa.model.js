import mongoose from 'mongoose'
import { toJSON, paginate } from './plugins'
const khoaSchema = mongoose.Schema(
  {
    tenKhoa: {
      type: String,
      trim: true,
      required: true,
    },
    soCBGD: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      transform(doc, ret, options) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      },
    },
  }
)

// add plugin that converts mongoose to json
khoaSchema.plugin(toJSON)
khoaSchema.plugin(paginate)

/**
 * @typedef Khoa
 */
const Khoa = mongoose.model('Khoa', khoaSchema)

export { Khoa }
