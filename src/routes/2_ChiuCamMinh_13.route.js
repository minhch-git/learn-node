import { Router } from 'express'
const router = new Router()
import { chiuCamMinhController } from '../controllers'
router.get('/', chiuCamMinhController.getHomePage)

router.get('/tim-kiem', chiuCamMinhController.getSearchPage)

router.get('/tao-lop', chiuCamMinhController.getCreateLopPage)
router.post('/tao-lop', chiuCamMinhController.createLop)

router.get('/cap-nhap-lop/:lopId', chiuCamMinhController.getUpdatePage)
router.post('/cap-nhap-lop/:lopId', chiuCamMinhController.updateLop)
router.get('/xoa-lop/:lopId', chiuCamMinhController.deleteLop)
export default router
