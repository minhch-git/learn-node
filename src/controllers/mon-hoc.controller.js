import createHttpError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { monHocService } from '../services'

/**
 * Create a monHoc
 * @POST api/v1/monHocs/
 * @access private
 */
const createMonHoc = catchAsync(async (req, res) => {
  const monHoc = await monHocService.createMonHoc(req.body)
  res.status(201).send(monHoc)
})

/**
 * Get all monHocs
 * @GET api/v1/monHocs
 * @access public
 */
const getMonHocs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['hoTen', 'nu', 'tinh'])
  let options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await monHocService.queryMonHocs(filter, options)
  res.status(200).send(result)
})

/**
 * Get a monHoc by monHoc id
 * @GET api/v1/monHocs/:monHocId
 * @access public
 */
const getMonHoc = catchAsync(async (req, res) => {
  const monHoc = await monHocService.getMonHocById(req.params.monHocId)
  if (!monHoc) {
    throw createHttpError.NotFound()
  }
  res.send(monHoc)
})

/**
 * Update a monHoc by monHocId
 * @PATCH api/v1/monHocs/:monHocId
 * @access private
 */
const updateMonHoc = catchAsync(async (req, res) => {
  const monHoc = await monHocService.updateMonHocById(
    req.params.monHocId,
    req.body
  )
  res.status(200).send(monHoc)
})

/**
 * Delete monHoc by monHocId
 * @DELETE api/v1/monHocs/:monHocId
 * @access private
 */
const deleteMonHoc = catchAsync(async (req, res) => {
  await monHocService.deleteMonHocById(req.params.monHocId)
  res.status(200).json({
    success: true,
    message: 'Deleted monHoc success!',
  })
})
export { createMonHoc, getMonHocs, getMonHoc, updateMonHoc, deleteMonHoc }
