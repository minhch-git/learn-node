import mongoose from 'mongoose'
import { toJSON, paginate } from './plugins'
const sinhVienSchema = mongoose.Schema(
  {
    hoTen: {
      type: String,
      trim: true,
      minLength: 5,
      maxLength: 30,
      required: true,
    },
    nu: {
      type: Boolean,
      default: true,
      trim: true,
      required: true,
    },
    ngaySinh: {
      type: Date,
      max: new Date(),
    },
    maLop: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Lop',
    },
    hocBong: {
      type: Number,
      min: 0,
    },
    tinh: {
      type: String,
      trim: true,
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
sinhVienSchema.plugin(toJSON)
sinhVienSchema.plugin(paginate)

/**
 * @typedef SinhVien
 */
const SinhVien = mongoose.model('SinhVien', sinhVienSchema)

export { SinhVien }
