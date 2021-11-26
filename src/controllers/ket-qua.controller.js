import createHttpError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { ketQuaService } from '../services'

/**
 * Create a ketQua
 * @POST api/v1/ketQuas/
 * @access private
 */
const createKetQua = catchAsync(async (req, res) => {
  const ketQua = await ketQuaService.createKetQua(req.body)
  res.status(201).send(ketQua)
})

/**
 * Get all ketQuas
 * @GET api/v1/ketQuas
 * @access public
 */
const getKetQuas = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['hoTen', 'nu', 'tinh'])
  let options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await ketQuaService.queryKetQuas(filter, options)
  res.status(200).send(result)
})

/**
 * Get a ketQua by ketQua id
 * @GET api/v1/ketQuas/:ketQuaId
 * @access public
 */
const getKetQua = catchAsync(async (req, res) => {
  const ketQua = await ketQuaService.getKetQuaById(req.params.ketQuaId)
  if (!ketQua) {
    throw createHttpError.NotFound()
  }
  res.send(ketQua)
})

/**
 * Update a ketQua by ketQuaId
 * @PATCH api/v1/ketQuas/:ketQuaId
 * @access private
 */
const updateKetQua = catchAsync(async (req, res) => {
  const ketQua = await ketQuaService.updateKetQuaById(
    req.params.ketQuaId,
    req.body
  )
  res.status(200).send(ketQua)
})

/**
 * Delete ketQua by ketQuaId
 * @DELETE api/v1/ketQuas/:ketQuaId
 * @access private
 */
const deleteKetQua = catchAsync(async (req, res) => {
  await ketQuaService.deleteKetQuaById(req.params.ketQuaId)
  res.status(200).json({
    success: true,
    message: 'Deleted ketQua success!',
  })
})
export { createKetQua, getKetQuas, getKetQua, updateKetQua, deleteKetQua }
