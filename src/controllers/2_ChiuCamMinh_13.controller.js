import catchAsync from '../utils/catchAsync'

import { lopService, khoaService } from '../services'

const getHomePage = catchAsync(async (req, res, next) => {
  const lops = await lopService.getLops()
  res.render('home/home', {
    titlePage: 'Danh sách Lớp',
    lops,
  })
})

const getSearchPage = catchAsync(async (req, res, next) => {
  const filter = req.query.id ? { _id: req.query.id } : {}
  try {
    const lops = await lopService.getLops(filter)
    res.render('search/search', {
      titlePage: 'Tìm lớp theo Id',
      caption: `Lớp ${req.query.id ? `có ID: ${req.query.id}` : ''}`,
      lops,
    })
  } catch (error) {
    res.render('search/search', {
      titlePage: 'Tìm lớp theo Id',
      caption: `Không tìm thấy lớp có ID: ${req.query.id}`,
      lops: [],
    })
  }
})

const getCreateLopPage = catchAsync(async (req, res, next) => {
  const khoas = await khoaService.getKhoas({})
  res.render('form/form', {
    titlePage: 'Thêm một lớp',
    khoas: khoas.length > 0 ? khoas : [],
  })
})

const createLop = catchAsync(async (req, res, next) => {
  await lopService.createLop(req.body)
  res.redirect('/api/')
})

const getUpdatePage = catchAsync(async (req, res, next) => {
  const khoas = await khoaService.getKhoas({})
  const lop = await lopService.getLopById(req.params.lopId)
  res.render('form/form-update', {
    titlePage: `Cập nhập lớp ${lop.tenLop}`,
    khoas: khoas.length > 0 ? khoas : [],
    lop,
  })
})

const updateLop = catchAsync(async (req, res, next) => {
  await lopService.updateLopById(req.params.lopId, req.body)
  res.redirect('/api/')
})

const deleteLop = catchAsync(async (req, res, next) => {
  await lopService.deleteLopById(req.params.lopId)
  res.redirect('/api/')
})

export {
  getHomePage,
  getSearchPage,
  getCreateLopPage,
  createLop,
  deleteLop,
  getUpdatePage,
  updateLop,
}
