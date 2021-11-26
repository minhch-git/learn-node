import { Router } from 'express'
const router = new Router()
import validate from '../middlewares/validate'
import { khoaValidation } from '../validations'
import { khoaController } from '../controllers'

router
  .route('/')
  .post(validate(khoaValidation.createKhoa), khoaController.createKhoa)
  .get(validate(khoaValidation.getKhoas), khoaController.getKhoas)

router
  .route('/:khoaId')
  .get(validate(khoaValidation.getKhoa), khoaController.getKhoa)
  .patch(validate(khoaValidation.updateKhoa), khoaController.updateKhoa)
  .delete(validate(khoaValidation.deleteKhoa), khoaController.deleteKhoa)

export default router
