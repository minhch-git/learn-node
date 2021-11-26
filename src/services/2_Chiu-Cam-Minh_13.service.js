import createHttpError from 'http-errors'
import { Khoa, Lop, SinhVien, MonHoc, KetQua } from '../models'
import mongoose from 'mongoose'

/**
 * Câu 1: Liệt kê danh sách các sinh viên của lớp CS19A1A, thông tin cần MaSV, HoTen, Nu, NgaySinh, MaLop, HocBong
 * @returns
 */
const getCau1 = async () => {
  const keyWord = 'CS19A1A'
  const lopCS19A1A = await Lop.findOne({
    tenLop: { $regex: keyWord, $options: 'i' },
  })
  if (!lopCS19A1A) {
    throw new createHttpError.NotFound('Not found lop CS19A1A')
  }
  const sinhViens = await SinhVien.find({ maLop: lopCS19A1A.id })
  return sinhViens
}

/**
 * // Câu 2: Lập danh sách lớp của khoa ngoại ngữ gồm: MaLop, TenLop, MaKhoa
 * @returns
 */
const getCau2 = async () => {
  const keyWord = 'Ngoại Ngữ'
  const khoaNN = await Khoa.findOne({
    tenKhoa: { $regex: keyWord, $options: 'i' },
  })
  if (!khoaNN) {
    throw new createHttpError.NotFound('Not found khoa Ngoại ngữ')
  }
  const results = await Lop.find({ maKhoa: khoaNN.id }).select(
    'id tenLop maKhoa'
  )
  return results
}

/**
 * Câu 3: Lập danh sách sinh viên không học bổng. Danh sách cần HoTen, Nu, NgaySinh, MaLop, HocBong
 * @returns
 */
const getCau3 = async () => {
  const results = await SinhVien.find({ hocBong: 0 }).select(
    'id hoTen nu hocBong'
  )
  return results
}

/**
 * Câu 4: Lập danh sách sinh viên nữ thuộc lớp CS19A1B. Danh sách cần các thuộc tính của quan hệ sinhvien
 * @returns
 */
const getCau4 = async () => {
  const keyWord = 'CS19A1B'
  const lopCS19A1B = await Lop.findOne({
    tenLop: { $regex: keyWord, $options: 'i' },
  })
  if (!lopCS19A1B) {
    throw new createHttpError.NotFound('Not found lop CS19A1B')
  }
  const sinhViens = await SinhVien.find({ maLop: lopCS19A1B.id, nu: true })
  return sinhViens
}

/**
 * Câu 5: Lập danh sách sinh viên có chữ lót hoặc tên là ‘Hồng’
 * @returns
 */
const getCau5 = async () => {
  const results = await SinhVien.find({
    $or: [
      { hoTen: { $regex: 'Hồng ', $options: 'i' } },
      { hoTen: { $regex: ' Hồng ', $options: 'i' } },
    ],
  })
  return results
}

/**
   Câu 6: Lập danh sách sinh viên nữ có điểm thi giảm dần
 * @returns
 */
const getCau6 = async () => {
  const results = await KetQua.find()
    .populate({ path: 'maSV', match: { nu: true } })
    .sort('-diemThi')

  return results
}

/**
 * Câu 7: Lập danh sách số lượng lớp của từng khoa
 * @returns
 */
const getCau7 = async () => {
  const results = await Lop.aggregate([
    {
      $group: { _id: '$maKhoa', SLLop: { $sum: 1 } },
    },
    {
      $lookup: {
        from: Khoa.collection.name,
        localField: '_id',
        foreignField: '_id',
        as: 'khoa',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] },
      },
    },
    {
      $project: { _id: 1, tenKhoa: 1, SLLop: 1 },
    },
  ])
  return results
}

/**
 * Câu 8: Lập danh sách sinh viên Đà Nẵng thuộc khoa công nghệ thông tin
 * @returns
 */
const getCau8 = async () => {
  const keyWord = 'Công Nghệ thông tin'
  const keyWordTinh = 'Đà Nẵng'
  const khoaCNTT = await Khoa.findOne({
    tenKhoa: { $regex: keyWord, $options: 'i' },
  })
  if (!khoaCNTT) {
    throw new createHttpError.NotFound('Not found khoa CNTT')
  }
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: Lop.collection.name,
        localField: 'maLop',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    { $project: { lop: 0 } },
    {
      $lookup: {
        from: Khoa.collection.name,
        localField: 'maKhoa',
        foreignField: '_id',
        as: 'khoa',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$khoa', 0] }, '$$ROOT'] },
      },
    },
    { $project: { khoa: 0 } },
    {
      $match: {
        $and: [
          { tinh: { $regex: keyWordTinh, $options: 'i' } },
          { maKhoa: mongoose.Types.ObjectId(khoaCNTT.id) },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        hoTen: 1,
        nu: 1,
        ngaySinh: 1,
        maLop: 1,
        hocBong: 1,
        tinh: 1,
      },
    },
  ])
  return results
}

/**
 * /Câu 9: Liệt kê danh sách khoa được sắp xếp tăng dần theo TenKhoa
 * @returns
 */
const getCau9 = async () => {
  const results = await Khoa.find().sort('tenKhoa')
  return results
}

/**
 * Câu 10: Liệt kê danh sách khoa có SoCBGD từ 10 đến 20 được sắp xếp giảm dần theo TenKhoa
 * @returns
 */
const getCau10 = async () => {
  const results = await Khoa.find({ soCBGD: { $gte: 10, $lte: 20 } }).sort(
    '-tenKhoa'
  )
  return results
}

export {
  getCau1,
  getCau2,
  getCau3,
  getCau4,
  getCau5,
  getCau6,
  getCau7,
  getCau8,
  getCau9,
  getCau10,
}
