import createError from 'http-errors'
import { SinhVien } from '../models'

/**
 * Create sinhVien
 * @param {Object} sinhVienBody
 * @returns {Promise<sinhVien>}
 */
const createSinhVien = async sinhVienBody => {
  const sinhVien = await SinhVien.create(sinhVienBody)
  return sinhVien
}

/**
 * Get sinhViens by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<sinhViens>}
 */
const querySinhViens = async (filter, options) => {
  const customLabels = {
    docs: 'sinhViens',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalSinhViens',
  }
  options = { ...options, customLabels }
  const sinhViens = await SinhVien.paginate(filter, options)
  return sinhViens
}

/**
 * Get all sinhViens
 * @returns {Promise<sinhVien>}
 */
const getSinhViens = async filter => {
  const sinhVien = await SinhVien.find(filter)
  return sinhVien
}

/**
 * Find sinhVien by id
 * @param {ObjectId} sinhVienId
 * @returns {Promise<sinhVien>}
 */
const getSinhVienById = async sinhVienId => {
  const sinhVien = await SinhVien.findById(sinhVienId)
  return sinhVien
}

/**
 * Update sinhVien by id
 * @param {ObjectId} sinhVienId
 * @param {Object} body
 * @returns {Promise<sinhVien>}
 */
const updateSinhVienById = async (sinhVienId, body) => {
  const sinhVien = await getSinhVienById(sinhVienId)
  if (!sinhVien) {
    throw createError.NotFound('Not found sinhVien')
  }
  Object.assign(sinhVien, body)
  await sinhVien.save()
  return sinhVien
}

/**
 * Delte sinhVien by id
 * @param {ObjectId} sinhVienId
 * @returns {Promise<sinhVien>}
 */
const deleteSinhVienById = async sinhVienId => {
  const sinhVien = await getSinhVienById(sinhVienId)
  if (!sinhVien) {
    throw createError.NotFound('Not found sinhVien')
  }
  const result = await sinhVien.remove()
  return result
}

export {
  createSinhVien,
  querySinhViens,
  getSinhViens,
  getSinhVienById,
  updateSinhVienById,
  deleteSinhVienById,
}
