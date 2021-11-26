import createError from 'http-errors'
import { Khoa } from '../models'

/**
 * Create khoa
 * @param {Object} khoaBody
 * @returns {Promise<khoa>}
 */
const createKhoa = async khoaBody => {
  const khoa = await Khoa.create(khoaBody)
  return khoa
}

/**
 * Get khoas by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<khoas>}
 */
const queryKhoas = async (filter, options) => {
  const customLabels = {
    docs: 'khoas',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalKhoas',
  }
  options = { ...options, customLabels }
  const khoas = await Khoa.paginate(filter, options)
  return khoas
}

/**
 * Find khoa by id
 * @param {Object} filter
 * @returns {Promise<khoa>}
 */
const getKhoas = async (filter = {}) => {
  const khoas = await Khoa.find(filter)
  return khoas
}

/**
 * Find khoa by id
 * @param {ObjectId} khoaId
 * @returns {Promise<khoa>}
 */
const getKhoaById = async khoaId => {
  const khoa = await Khoa.findById(khoaId)
  return khoa
}

/**
 * Update khoa by id
 * @param {ObjectId} khoaId
 * @param {Object} body
 * @returns {Promise<khoa>}
 */
const updateKhoaById = async (khoaId, body) => {
  const khoa = await getKhoaById(khoaId)
  if (!khoa) {
    throw createError.NotFound('Not found khoa')
  }
  Object.assign(khoa, body)
  await khoa.save()
  return khoa
}

/**
 * Delte khoa by id
 * @param {ObjectId} khoaId
 * @returns {Promise<khoa>}
 */
const deleteKhoaById = async khoaId => {
  const khoa = await getKhoaById(khoaId)
  if (!khoa) {
    throw createError.NotFound('Not found khoa')
  }
  const result = await khoa.remove()
  return result
}

export {
  createKhoa,
  queryKhoas,
  getKhoaById,
  updateKhoaById,
  deleteKhoaById,
  getKhoas,
}
