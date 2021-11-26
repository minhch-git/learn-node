import { Router } from 'express'
import authRoutes from './auth.route'
import userRoutes from './user.route'
import uploadRoutes from './upload.route'
import sinhVienRoutes from './sinh-vien.route'
import khoaRoutes from './khoa.route'
import lopRoutes from './lop.route'
import monHocRoutes from './mon-hoc.route'
import ketQuaRoutes from './ket-qua.route'
import baiKiemTraRoutes from './bai-kiem-tra.route'

import chiuCamMinhRoutes from './2_ChiuCamMinh_13.route'
const router = new Router()

const defaultRoutes = [
  {
    path: '/bai-kiem-tra',
    route: baiKiemTraRoutes,
  },
  {
    path: '/khoa',
    route: khoaRoutes,
  },
  {
    path: '/lop',
    route: lopRoutes,
  },
  {
    path: '/sinh-vien',
    route: sinhVienRoutes,
  },
  {
    path: '/mon-hoc',
    route: monHocRoutes,
  },
  {
    path: '/ket-qua',
    route: ketQuaRoutes,
  },
  {
    path: '/upload',
    route: uploadRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/',
    route: chiuCamMinhRoutes,
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
