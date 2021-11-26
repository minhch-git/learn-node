import mongoose from 'mongoose'
import { toJSON, paginate } from './plugins'
const lopSchema = mongoose.Schema(
  {
    tenLop: {
      type: String,
      trim: true,
      required: true,
    },
    maKhoa: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Khoa',
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
lopSchema.plugin(toJSON)
lopSchema.plugin(paginate)

/**
 * @typedef Lop
 */
const Lop = mongoose.model('Lop', lopSchema)

export { Lop }
