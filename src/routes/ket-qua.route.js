import { Router } from 'express'
const router = new Router()
import validate from '../middlewares/validate'
import { ketQuaValidation } from '../validations'
import { ketQuaController } from '../controllers'

router
  .route('/')
  .post(validate(ketQuaValidation.createKetQua), ketQuaController.createKetQua)
  .get(validate(ketQuaValidation.getKetQuas), ketQuaController.getKetQuas)

router
  .route('/:ketQuaId')
  .get(validate(ketQuaValidation.getKetQua), ketQuaController.getKetQua)
  .patch(validate(ketQuaValidation.updateKetQua), ketQuaController.updateKetQua)
  .delete(
    validate(ketQuaValidation.deleteKetQua),
    ketQuaController.deleteKetQua
  )

export default router
