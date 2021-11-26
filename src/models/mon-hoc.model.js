import mongoose from 'mongoose'
import { toJSON, paginate } from './plugins'
const monHocSchema = mongoose.Schema(
  {
    tenMH: {
      type: String,
      trim: true,
      required: true,
    },
    soTiet: {
      type: Number,
      min: 1,
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
monHocSchema.plugin(toJSON)
monHocSchema.plugin(paginate)

/**
 * @typedef MonHoc
 */
const MonHoc = mongoose.model('MonHoc', monHocSchema)

export { MonHoc }
