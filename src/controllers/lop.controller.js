import createHttpError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { lopService } from '../services'

/**
 * Create a lop
 * @POST api/v1/lops/
 * @access private
 */
const createLop = catchAsync(async (req, res) => {
  const lop = await lopService.createLop(req.body)
  res.status(201).send(lop)
})

/**
 * Get all lops
 * @GET api/v1/lops
 * @access public
 */
const getLops = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['hoTen', 'nu', 'tinh'])
  let options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await lopService.queryLops(filter, options)
  res.status(200).send(result)
})

/**
 * Get a lop by lop id
 * @GET api/v1/lops/:lopId
 * @access public
 */
const getLop = catchAsync(async (req, res) => {
  const lop = await lopService.getLopById(req.params.lopId)
  if (!lop) {
    throw createHttpError.NotFound()
  }
  res.send(lop)
})

/**
 * Update a lop by lopId
 * @PATCH api/v1/lops/:lopId
 * @access private
 */
const updateLop = catchAsync(async (req, res) => {
  const lop = await lopService.updateLopById(req.params.lopId, req.body)
  res.status(200).send(lop)
})

/**
 * Delete lop by lopId
 * @DELETE api/v1/lops/:lopId
 * @access private
 */
const deleteLop = catchAsync(async (req, res) => {
  await lopService.deleteLopById(req.params.lopId)
  res.status(200).json({
    success: true,
    message: 'Deleted lop success!',
  })
})
export { createLop, getLops, getLop, updateLop, deleteLop }
