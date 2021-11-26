import { Router } from 'express'
const router = new Router()
import validate from '../middlewares/validate'
import { monHocValidation } from '../validations'
import { monHocController } from '../controllers'

router
  .route('/')
  .post(validate(monHocValidation.createMonHoc), monHocController.createMonHoc)
  .get(validate(monHocValidation.getMonHocs), monHocController.getMonHocs)

router
  .route('/:monHocId')
  .get(validate(monHocValidation.getMonHoc), monHocController.getMonHoc)
  .patch(validate(monHocValidation.updateMonHoc), monHocController.updateMonHoc)
  .delete(
    validate(monHocValidation.deleteMonHoc),
    monHocController.deleteMonHoc
  )

export default router
