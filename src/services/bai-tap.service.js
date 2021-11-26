import createHttpError from 'http-errors'
import mongoose from 'mongoose'

import { Khoa, Lop, SinhVien, MonHoc, KetQua } from '../services'

/**
 * // Câu 1: Liệt kê danh sách các lớp của khoa, thông tin cần Malop, TenLop, MaKhoa
 * @returns
 */
const getCau1 = async () => {
  const lops = await Lop.find()
  return lops
}

/**
 * // Câu 2: Lập danh sách sinh viên gồm: MaSV, HoTen, HocBong
 * @returns
 */
const getCau2 = async () => {
  const results = await SinhVien.find().select('id hoTen hocBong')
  return results
}

/**
 * // Câu 3: Lập danh sách sinh viên có học bổng. Danh sách cần MaSV, Nu, HocBong
 * @returns
 */
const getCau3 = async () => {
  const results = await SinhVien.find()
    .select('id hoTen nu hocBong')
    .where('hocBong')
    .gt(0)
  return results
}

/**
 * // Câu 4: Lập danh sách sinh viên nữ. Danh sách cần các thuộc tính của quan hệ sinhvien
 * @returns
 */
const getCau4 = async () => {
  const results = await SinhVien.find().where('nu').equals('Yes')
  return results
}

/**
 * // Câu 5: Lập danh sách sinh viên có họ ‘Trần’
 * @returns
 */
const getCau5 = async () => {
  const results = await SinhVien.find({ hoTen: /^Trần/ })
  return results
}

/**
 * // Câu 6: Lập danh sách sinh viên nữ có học bổng
 * @returns
 */
const getCau6 = async () => {
  const results = await SinhVien.find()
    .where('nu')
    .equals('Yes')
    .where('hocBong')
    .gt(0)
  return results
}

/**
 * // Câu 7: Lập danh sách sinh viên nữ hoặc danh sách sinh viên có học bổng
 * @returns
 */
const getCau7 = async () => {
  const results = await SinhVien.find({
    $or: [{ nu: 'Yes' }, { hocBong: { $gt: 0 } }],
  })
  return results
}

/**
 * // Câu 8: Lập danh sách sinh viên có năm sinh từ 1978 đến 1985. Danh sách cần các thuộc tính của quan hệ SinhVien
 * @returns
 */
const getCau8 = async () => {
  const results = await SinhVien.find({
    ngaySinh: {
      $gte: new Date(1978, 1, 1),
      $lt: new Date(1986, 1, 1),
    },
  })
  return results
}

/**
 * // Câu 9: Liệt kê danh sách sinh viên được sắp xếp tăng dần theo MaSV
 * @returns
 */
const getCau9 = async () => {
  const results = await SinhVien.find().sort('id')
  return results
}

/**
 * // Câu 10: Liệt kê danh sách sinh viên được sắp xếp giảm dần theo HocBong
 * @returns
 */
const getCau10 = async () => {
  const results = await SinhVien.find().sort('-hocBong')
  return results
}

/**
 * // Câu 11: Lập danh sách sinh viên có điểm thi môn CSDL>=8
 * @returns
 */
const getCau11 = async () => {
  const results = await KetQua.find({ diemThi: { $gte: 8 } })
    .populate({
      path: 'maSV',
      select: 'hoTen nu ngaySinh maLop hocBong tinh id',
    })
    .select('maSV')
  return results.map(item => item.maSV)
}

/**
 * // Câu 12: Lập danh sách sinh viên có học bổng của khoa CNTT.
 * @returns
 */
const getCau12 = async () => {
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
      $match: {
        $and: [
          { hocBong: { $gt: 0 } },
          { maKhoa: mongoose.Types.ObjectId('61862d55a941e609e8fd4cdb') },
        ],
      },
    },
    {
      $project: { _id: 1, hoTen: 1, hocBong: 1, tenLop: 1 },
    },
  ])
  return results
}

/**
 * // Câu 13: Lập danh sách sinh viên có học bổng của khoa CNTT.
 * @returns
 */
const getCau13 = async () => {
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
          { hocBong: { $gt: 0 } },
          { maKhoa: mongoose.Types.ObjectId('61862d55a941e609e8fd4cdb') },
        ],
      },
    },
    {
      $project: { _id: 1, hoTen: 1, hocBong: 1, tenLop: 1, tenKhoa: 1 },
    },
  ])
  return results
}

/**
 * // Câu 14: Cho biết số sinh viên của mỗi lớp
 * @returns
 */
const getCau14 = async () => {
  const results = await SinhVien.aggregate([
    {
      $group: { _id: '$maLop', SLSinhVien: { $sum: 1 } },
    },
    {
      $lookup: {
        from: Lop.collection.name,
        localField: '_id',
        foreignField: '_id',
        as: 'lop',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$lop', 0] }, '$$ROOT'] },
      },
    },
    {
      $project: { _id: 1, tenLop: 1, SLSinhVien: 1 },
    },
  ])
  return results
}

/**
 * // Câu 15: Cho biết số lượng sinh viên của mỗi khoa.
 * @returns
 */
const getCau15 = async () => {
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
    {
      $group: {
        _id: '$maKhoa',
        tenKhoa: { $first: '$tenKhoa' },
        SLSinhVien: { $sum: 1 },
      },
    },
  ])
  return results
}

/**
 * // Câu 16: Cho biết số lượng sinh viên nữ của mỗi khoa.
 * @returns
 */
const getCau16 = async () => {
  const results = await SinhVien.aggregate([
    {
      $match: { nu: 'Yes' },
    },
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
    {
      $group: {
        _id: '$maKhoa',
        tenKhoa: { $first: '$tenKhoa' },
        SLSinhVien: { $sum: 1 },
      },
    },
  ])
  return results
}

/**
 * // Câu 17: Cho biết tổng tiền học bổng của mỗi lớp
 * @returns
 */
const getCau17 = async () => {
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
    {
      $group: {
        _id: '$maLop',
        tenLop: { $first: '$tenLop' },
        tongHB: { $sum: '$hocBong' },
      },
    },
  ])
  return results
}

/**
 * // Câu 18: Cho biết tổng số tiền học bổng của mỗi khoa
 * @returns
 */
const getCau18 = async () => {
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
    {
      $group: {
        _id: '$maLop',
        tenKhoa: { $first: '$tenKhoa' },
        tongHB: { $sum: '$hocBong' },
      },
    },
  ])
  return results
}

/**
 * // Câu 19: Lập danh sánh những khoa có nhiều hơn 100 sinh viên. Danh sách cần: MaKhoa, TenKhoa, Soluong
 * @returns
 */
const getCau19 = async () => {
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
    {
      $group: {
        _id: '$maLop',
        tenKhoa: { $first: '$tenKhoa' },
        SLSinhVien: { $sum: 1 },
      },
    },
    {
      $match: {
        SLSinhVien: { $gt: 100 },
      },
    },
  ])
  return results
}

/**
 * // Câu 20: Lập danh sánh những khoa có nhiều hơn 50 sinh viên nữ. Danh sách cần: MaKhoa, TenKhoa, Soluong
 * @returns
 */
const getCau20 = async () => {
  const results = await SinhVien.aggregate([
    {
      $match: { nu: 'Yes' },
    },
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
    {
      $group: {
        _id: '$maLop',
        tenKhoa: { $first: '$tenKhoa' },
        SLSinhVien: { $sum: 1 },
      },
    },
    {
      $match: {
        SLSinhVien: { $gte: 50 },
      },
    },
  ])
  return results
}

/**
 * // Câu 21: Lập danh sách những khoa có tổng tiền học bổng >=1000000.
 * @returns
 */
const getCau21 = async () => {
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
    {
      $group: {
        _id: '$maLop',
        tenKhoa: { $first: '$tenKhoa' },
        tongHB: { $sum: '$hocBong' },
      },
    },
    {
      $match: { tongHB: { $gte: 1000000 } },
    },
  ])
  return results
}

/**
 * // Câu 22: Lập danh sách sinh viên có học bổng cao nhất
 * @returns
 */
const getCau22 = async () => {
  const results = await SinhVien.find().sort({ hocBong: -1 }).limit(1)
  return results
}

/**
 * // Câu 23: Lập danh sách sinh viên có điểm thi môn CSDL cao nhất
 * @returns
 */
const getCau23 = async () => {
  const results = await SinhVien.aggregate([
    {
      $lookup: {
        from: KetQua.collection.name,
        localField: '_id',
        foreignField: 'maSV',
        as: 'ketQua',
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ['$ketQua', 0] }, '$$ROOT'],
        },
      },
    },
    {
      $project: { ketQua: 0 },
    },
    {
      $match: { maMH: mongoose.Types.ObjectId('61862d09a941e609e8fd4cd3') },
    },
    {
      $sort: { diemThi: -1 },
    },
    {
      $limit: 1,
    },
  ])
  return results
}

/**
 * // Câu 24: Lập danh sách những sinh viên không có điểm thi môn CSDL.
 * @returns
 */
const getCau24 = async () => {
  const ketQuaResult = await KetQua.find({
    maMH: mongoose.Types.ObjectId('61862d09a941e609e8fd4cd3'),
  }).select('maSV')
  const results = await SinhVien.find({
    _id: { $nin: ketQuaResult.map(x => x.maSV) },
  })
  return results
}

/**
 * // Câu 25: Cho biết những khoa nào có nhiều sinh viên nhất
 * @returns
 */
const getCau25 = async () => {
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
    {
      $group: {
        _id: '$maLop',
        tenKhoa: { $first: '$tenKhoa' },
        SoLuongSV: { $sum: 1 },
      },
    },
    {
      $sort: { SoLuongSV: -1 },
    },
    {
      $limit: 1,
    },
  ])
  return results
}

export default {
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
  getCau11,
  getCau12,
  getCau13,
  getCau14,
  getCau15,
  getCau16,
  getCau17,
  getCau18,
  getCau19,
  getCau20,
  getCau21,
  getCau22,
  getCau23,
  getCau24,
  getCau25,
}
