import catchAsync from '../utils/catchAsync'
import { baiTapController } from '../services'

// Câu 1: Liệt kê danh sách các lớp của khoa, thông tin cần Malop, TenLop, MaKhoa
const getCau1 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau1()
  return res.status(200).json({ success: true, data: result })
})
// Câu 2: Lập danh sách sinh viên gồm: MaSV, HoTen, HocBong
const getCau2 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau2()
  return res.status(200).json({ success: true, data: result })
})
// Câu 3: Lập danh sách sinh viên có học bổng. Danh sách cần MaSV, Nu, HocBong
const getCau3 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau3()
  return res.status(200).json({ success: true, data: result })
})
// Câu 4: Lập danh sách sinh viên nữ. Danh sách cần các thuộc tính của quan hệ sinhvien
const getCau4 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau4()
  return res.status(200).json({ success: true, data: result })
})
// Câu 5: Lập danh sách sinh viên có họ ‘Trần’
const getCau5 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau5()
  return res.status(200).json({ success: true, data: result })
})
// Câu 6: Lập danh sách sinh viên nữ có học bổng
const getCau6 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau6()
  return res.status(200).json({ success: true, data: result })
})
// Câu 7: Lập danh sách sinh viên nữ hoặc danh sách sinh viên có học bổng
const getCau7 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau7()
  return res.status(200).json({ success: true, data: result })
})
// Câu 8: Lập danh sách sinh viên có năm sinh từ 1978 đến 1985. Danh sách cần các thuộc tính của quan hệ SinhVien
const getCau8 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau8()
  return res.status(200).json({ success: true, data: result })
})
// Câu 9: Liệt kê danh sách sinh viên được sắp xếp tăng dần theo MaSV
const getCau9 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau9()
  return res.status(200).json({ success: true, data: result })
})
// Câu 10: Liệt kê danh sách sinh viên được sắp xếp giảm dần theo HocBong
const getCau10 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau10()
  return res.status(200).json({ success: true, data: result })
})
// Câu 11: Lập danh sách sinh viên có điểm thi môn CSDL>=8
const getCau11 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau11()
  return res.status(200).json({ success: true, data: result })
})
// Câu 12: Lập danh sách sinh viên có học bổng của khoa CNTT. Thông tin cần: MaSV, HoTen, HocBong,TenLop
const getCau12 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau12()
  return res.status(200).json({ success: true, data: result })
})
// Câu 13: Lập danh sách sinh viên có học bổng của khoa CNTT. Thông tin cần: MaSV, HoTen, HocBong,TenLop, TenKhoa
const getCau13 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau13()
  return res.status(200).json({ success: true, data: result })
})
// Câu 14: Cho biết số sinh viên của mỗi lớp
const getCau14 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau14()
  return res.status(200).json({ success: true, data: result })
})
// Câu 15: Cho biết số lượng sinh viên của mỗi khoa.
const getCau15 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau15()
  return res.status(200).json({ success: true, data: result })
})
// Câu 16: Cho biết số lượng sinh viên nữ của mỗi khoa.
const getCau16 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau16()
  return res.status(200).json({ success: true, data: result })
})
// Câu 17: Cho biết tổng tiền học bổng của mỗi lớp
const getCau17 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau17()
  return res.status(200).json({ success: true, data: result })
})
// Câu 18: Cho biết tổng số tiền học bổng của mỗi khoa
const getCau18 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau18()
  return res.status(200).json({ success: true, data: result })
})
// Câu 19: Lập danh sánh những khoa có nhiều hơn 100 sinh viên. Danh sách cần: MaKhoa, TenKhoa, Soluong
const getCau19 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau19()
  return res.status(200).json({ success: true, data: result })
})
// Câu 20: Lập danh sánh những khoa có nhiều hơn 50 sinh viên nữ. Danh sách cần: MaKhoa, TenKhoa, Soluong
const getCau20 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau20()
  return res.status(200).json({ success: true, data: result })
})
// Câu 21: Lập danh sách những khoa có tổng tiền học bổng >=1000000.
const getCau21 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau21()
  return res.status(200).json({ success: true, data: result })
})
// Câu22: Lập danh sách sinh viên có học bổng cao nhất
const getCau22 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau22()
  return res.status(200).json({ success: true, data: result })
})
// Câu 23: Lập danh sách sinh viên có điểm thi môn CSDL cao nhất
const getCau23 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau23()
  return res.status(200).json({ success: true, data: result })
})
// Câu 24: Lập danh sách những sinh viên không có điểm thi môn CSDL.
const getCau24 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau24()
  return res.status(200).json({ success: true, data: result })
})
// Câu 25: Cho biết những khoa nào có nhiều sinh viên nhất
const getCau25 = catchAsync(async (req, res, next) => {
  const result = await baiTapService.getCau25()
  return res.status(200).json({ success: true, data: result })
})

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
