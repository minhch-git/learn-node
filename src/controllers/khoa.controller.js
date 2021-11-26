import createHttpError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { khoaService } from '../services'

/**
 * Create a khoa
 * @POST api/v1/khoas/
 * @access private
 */
const createKhoa = catchAsync(async (req, res) => {
  const khoa = await khoaService.createKhoa(req.body)
  res.status(201).send(khoa)
})

/**
 * Get all khoas
 * @GET api/v1/khoas
 * @access public
 */
const getKhoas = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['hoTen', 'nu', 'tinh'])
  let options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await khoaService.queryKhoas(filter, options)
  res.status(200).send(result)
})

/**
 * Get a khoa by khoa id
 * @GET api/v1/khoas/:khoaId
 * @access public
 */
const getKhoa = catchAsync(async (req, res) => {
  const khoa = await khoaService.getKhoaById(req.params.khoaId)
  if (!khoa) {
    throw createHttpError.NotFound()
  }
  res.send(khoa)
})

/**
 * Update a khoa by khoaId
 * @PATCH api/v1/khoas/:khoaId
 * @access private
 */
const updateKhoa = catchAsync(async (req, res) => {
  const khoa = await khoaService.updateKhoaById(req.params.khoaId, req.body)
  res.status(200).send(khoa)
})

/**
 * Delete khoa by khoaId
 * @DELETE api/v1/khoas/:khoaId
 * @access private
 */
const deleteKhoa = catchAsync(async (req, res) => {
  await khoaService.deleteKhoaById(req.params.khoaId)
  res.status(200).json({
    success: true,
    message: 'Deleted khoa success!',
  })
})
export { createKhoa, getKhoas, getKhoa, updateKhoa, deleteKhoa }
