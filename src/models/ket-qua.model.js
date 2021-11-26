import mongoose from 'mongoose'
import { toJSON, paginate } from './plugins'
const ketQuaSchema = mongoose.Schema(
  {
    maSV: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'SinhVien',
    },
    maMH: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'MonHoc',
    },
    diemThi: {
      type: Number,
      min: 0,
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
ketQuaSchema.plugin(toJSON)
ketQuaSchema.plugin(paginate)

/**
 * @typedef KetQua
 */
const KetQua = mongoose.model('KetQua', ketQuaSchema)

export { KetQua }
