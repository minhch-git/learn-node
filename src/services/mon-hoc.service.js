import createError from 'http-errors'
import { MonHoc } from '../models'

/**
 * Create monHoc
 * @param {Object} monHocBody
 * @returns {Promise<monHoc>}
 */
const createMonHoc = async monHocBody => {
  const monHoc = await MonHoc.create(monHocBody)
  return monHoc
}

/**
 * Get monHocs by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<monHocs>}
 */
const queryMonHocs = async (filter, options) => {
  const customLabels = {
    docs: 'monHocs',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalMonHocs',
  }
  options = { ...options, customLabels }
  const monHocs = await MonHoc.paginate(filter, options)
  return monHocs
}

/**
 * Find monHoc by id
 * @param {ObjectId} monHocId
 * @returns {Promise<monHoc>}
 */
const getMonHocById = async monHocId => {
  const monHoc = await MonHoc.findById(monHocId)
  return monHoc
}

/**
 * Update monHoc by id
 * @param {ObjectId} monHocId
 * @param {Object} body
 * @returns {Promise<monHoc>}
 */
const updateMonHocById = async (monHocId, body) => {
  const monHoc = await getMonHocById(monHocId)
  if (!monHoc) {
    throw createError.NotFound('Not found monHoc')
  }
  Object.assign(monHoc, body)
  await monHoc.save()
  return monHoc
}

/**
 * Delte monHoc by id
 * @param {ObjectId} monHocId
 * @returns {Promise<monHoc>}
 */
const deleteMonHocById = async monHocId => {
  const monHoc = await getMonHocById(monHocId)
  if (!monHoc) {
    throw createError.NotFound('Not found monHoc')
  }
  const result = await monHoc.remove()
  return result
}

export {
  createMonHoc,
  queryMonHocs,
  getMonHocById,
  updateMonHocById,
  deleteMonHocById,
}
