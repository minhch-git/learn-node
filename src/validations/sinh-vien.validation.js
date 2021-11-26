import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'
const createSinhVien = {
  hoTen: yup.string().required(),
  ngaySinh: yup.date().required(),
  maLop: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  hocBong: yup.number().default(0),
  nu: yup.boolean().default(true),
  tinh: yup.string().required(),
}

const getSinhViens = {
  hoTen: yup.string(),
  ngaySinh: yup.date(),
  maLop: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  hocBong: yup.number(),
  nu: yup.boolean(),
  tinh: yup.string(),

  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string(),
}

const getSinhVien = {
  sinhVienId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateSinhVien = {
  sinhVienId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  hoTen: yup.string(),
  ngaySinh: yup.date(),
  maLop: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  hocBong: yup.number(),
  nu: yup.boolean(),
  tinh: yup.string(),
  checkbox_selection: yup
    .string()
    .when(['hoTen', 'ngaySinh', 'maLop', 'hocBong', 'nu', 'tinh'], {
      is: (hoTen, ngaySinh, maLop, hocBong, nu, tinh) =>
        !hoTen && !ngaySinh && !maLop && !hocBong && !nu && !tinh,
      then: yup.string().required(),
    }),
}

const deleteSinhVien = {
  sinhVienId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export {
  createSinhVien,
  getSinhViens,
  getSinhVien,
  updateSinhVien,
  deleteSinhVien,
}
