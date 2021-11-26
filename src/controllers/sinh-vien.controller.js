import createHttpError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { sinhVienService } from '../services'

/**
 * Create a sinhVien
 * @POST api/v1/sinhViens/
 * @access private
 */
const createSinhVien = catchAsync(async (req, res) => {
  const sinhVien = await sinhVienService.createSinhVien(req.body)
  res.status(201).send(sinhVien)
})

/**
 * Get all sinhViens
 * @GET api/v1/sinhViens
 * @access public
 */
const getSinhViens = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['hoTen', 'nu', 'tinh'])
  let options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await sinhVienService.querySinhViens(filter, options)
  res.status(200).send(result)
})

/**
 * Get a sinhVien by sinhVien id
 * @GET api/v1/sinhViens/:sinhVienId
 * @access public
 */
const getSinhVien = catchAsync(async (req, res) => {
  const sinhVien = await sinhVienService.getSinhVienById(req.params.sinhVienId)
  if (!sinhVien) {
    throw createHttpError.NotFound()
  }
  res.send(sinhVien)
})

/**
 * Update a sinhVien by sinhVienId
 * @PATCH api/v1/sinhViens/:sinhVienId
 * @access private
 */
const updateSinhVien = catchAsync(async (req, res) => {
  const sinhVien = await sinhVienService.updateSinhVienById(
    req.params.sinhVienId,
    req.body
  )
  res.status(200).send(sinhVien)
})

/**
 * Delete sinhVien by sinhVienId
 * @DELETE api/v1/sinhViens/:sinhVienId
 * @access private
 */
const deleteSinhVien = catchAsync(async (req, res) => {
  await sinhVienService.deleteSinhVienById(req.params.sinhVienId)
  res.status(200).json({
    success: true,
    message: 'Deleted sinhVien success!',
  })
})
export {
  createSinhVien,
  getSinhViens,
  getSinhVien,
  updateSinhVien,
  deleteSinhVien,
}
