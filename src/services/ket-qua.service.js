import createError from 'http-errors'
import { KetQua } from '../models'

/**
 * Create ketQua
 * @param {Object} ketQuaBody
 * @returns {Promise<ketQua>}
 */
const createKetQua = async ketQuaBody => {
  const ketQua = await KetQua.create(ketQuaBody)
  return ketQua
}

/**
 * Get ketQuas by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<ketQuas>}
 */
const queryKetQuas = async (filter, options) => {
  const customLabels = {
    docs: 'ketQuas',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalKetQuas',
  }
  options = { ...options, customLabels }
  const ketQuas = await KetQua.paginate(filter, options)
  return ketQuas
}

/**
 * Find ketQua by id
 * @param {ObjectId} ketQuaId
 * @returns {Promise<ketQua>}
 */
const getKetQuaById = async ketQuaId => {
  const ketQua = await KetQua.findById(ketQuaId)
  return ketQua
}

/**
 * Update ketQua by id
 * @param {ObjectId} ketQuaId
 * @param {Object} body
 * @returns {Promise<ketQua>}
 */
const updateKetQuaById = async (ketQuaId, body) => {
  const ketQua = await getKetQuaById(ketQuaId)
  if (!ketQua) {
    throw createError.NotFound('Not found ketQua')
  }
  Object.assign(ketQua, body)
  await ketQua.save()
  return ketQua
}

/**
 * Delte ketQua by id
 * @param {ObjectId} ketQuaId
 * @returns {Promise<ketQua>}
 */
const deleteKetQuaById = async ketQuaId => {
  const ketQua = await getKetQuaById(ketQuaId)
  if (!ketQua) {
    throw createError.NotFound('Not found ketQua')
  }
  const result = await ketQua.remove()
  return result
}

export {
  createKetQua,
  queryKetQuas,
  getKetQuaById,
  updateKetQuaById,
  deleteKetQuaById,
}
