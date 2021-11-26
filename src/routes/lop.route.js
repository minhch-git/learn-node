import { Router } from 'express'
const router = new Router()
import validate from '../middlewares/validate'
import { lopValidation } from '../validations'
import { lopController } from '../controllers'

router
  .route('/')
  .post(validate(lopValidation.createLop), lopController.createLop)
  .get(validate(lopValidation.getLops), lopController.getLops)

router
  .route('/:lopId')
  .get(validate(lopValidation.getLop), lopController.getLop)
  .patch(validate(lopValidation.updateLop), lopController.updateLop)
  .delete(validate(lopValidation.deleteLop), lopController.deleteLop)

export default router
