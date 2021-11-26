import { Router } from 'express'
import { baiKiemTraController } from '../controllers'
const router = new Router()

router.get('/cau-1', baiKiemTraController.getCau1)
router.get('/cau-2', baiKiemTraController.getCau2)
router.get('/cau-3', baiKiemTraController.getCau3)
router.get('/cau-4', baiKiemTraController.getCau4)
router.get('/cau-5', baiKiemTraController.getCau5)
router.get('/cau-6', baiKiemTraController.getCau6)
router.get('/cau-7', baiKiemTraController.getCau7)
router.get('/cau-8', baiKiemTraController.getCau8)
router.get('/cau-9', baiKiemTraController.getCau9)
router.get('/cau-10', baiKiemTraController.getCau10)

export default router
