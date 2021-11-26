import createError from 'http-errors'
import { Lop } from '../models'

/**
 * Create lop
 * @param {Object} lopBody
 * @returns {Promise<lop>}
 */
const createLop = async lopBody => {
  const lop = await Lop.create(lopBody)
  return lop
}

/**
 * Get lops by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<lops>}
 */
const queryLops = async (filter, options) => {
  const customLabels = {
    docs: 'lops',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalLops',
  }
  options = { ...options, customLabels }
  const lops = await Lop.paginate(filter, options)
  return lops
}

/**
 * Find lops
 * @param {Object} filter
 * @returns {Promise<lop>}
 */
const getLops = async (filter = {}) => {
  const lop = await Lop.find(filter)
  return lop
}

/**
 * Find lop by id
 * @param {ObjectId} lopId
 * @returns {Promise<lop>}
 */
const getLopById = async lopId => {
  const lop = await Lop.findById(lopId)
  return lop
}

/**
 * Update lop by id
 * @param {ObjectId} lopId
 * @param {Object} body
 * @returns {Promise<lop>}
 */
const updateLopById = async (lopId, body) => {
  const lop = await getLopById(lopId)
  if (!lop) {
    throw createError.NotFound('Not found lop')
  }
  Object.assign(lop, body)
  await lop.save()
  return lop
}

/**
 * Delte lop by id
 * @param {ObjectId} lopId
 * @returns {Promise<lop>}
 */
const deleteLopById = async lopId => {
  const lop = await getLopById(lopId)
  if (!lop) {
    throw createError.NotFound('Not found lop')
  }
  const result = await lop.remove()
  return result
}

export {
  createLop,
  queryLops,
  getLopById,
  updateLopById,
  deleteLopById,
  getLops,
}
