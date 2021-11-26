import catchAsync from '../utils/catchAsync'
import { baiKiemTraService } from '../services'

const getCau1 = catchAsync(async (req, res, next) => {
  const result = await baiKiemTraService.getCau1()
  return res.status(200).json({ success: true, data: result })
})
const getCau2 = catchAsync(async (req, res, next) => {
  const result = await baiKiemTraService.getCau2()
  return res.status(200).json({ success: true, data: result })
})
const getCau3 = catchAsync(async (req, res, next) => {
  const result = await baiKiemTraService.getCau3()
  return res.status(200).json({ success: true, data: result })
})
const getCau4 = catchAsync(async (req, res, next) => {
  const result = await baiKiemTraService.getCau4()
  return res.status(200).json({ success: true, data: result })
})
const getCau5 = catchAsync(async (req, res, next) => {
  const result = await baiKiemTraService.getCau5()
  return res.status(200).json({ success: true, data: result })
})
const getCau6 = catchAsync(async (req, res, next) => {
  const result = await baiKiemTraService.getCau6()
  return res.status(200).json({ success: true, data: result })
})
const getCau7 = catchAsync(async (req, res, next) => {
  const result = await baiKiemTraService.getCau7()
  return res.status(200).json({ success: true, data: result })
})
const getCau8 = catchAsync(async (req, res, next) => {
  const result = await baiKiemTraService.getCau8()
  return res.status(200).json({ success: true, data: result })
})
const getCau9 = catchAsync(async (req, res, next) => {
  const result = await baiKiemTraService.getCau9()
  return res.status(200).json({ success: true, data: result })
})
const getCau10 = catchAsync(async (req, res, next) => {
  const result = await baiKiemTraService.getCau10()
  return res.status(200).json({ success: true, data: result })
})
export {
  getCau1,
  getCau2,
  getCau3,
  getCau4,
  getCau5,
  getCau6,
  getCau7,
  getCau8,
  getCau9,
  getCau10,
}
