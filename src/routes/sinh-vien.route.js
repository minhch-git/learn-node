import { Router } from 'express'
const router = new Router()
import validate from '../middlewares/validate'
import { sinhVienValidation } from '../validations'
import { sinhVienController } from '../controllers'

router
  .route('/')
  .post(
    validate(sinhVienValidation.createSinhVien),
    sinhVienController.createSinhVien
  )
  .get(
    validate(sinhVienValidation.getSinhViens),
    sinhVienController.getSinhViens
  )

router
  .route('/:sinhVienId')
  .get(validate(sinhVienValidation.getSinhVien), sinhVienController.getSinhVien)
  .patch(
    validate(sinhVienValidation.updateSinhVien),
    sinhVienController.updateSinhVien
  )
  .delete(
    validate(sinhVienValidation.deleteSinhVien),
    sinhVienController.deleteSinhVien
  )

export default router
