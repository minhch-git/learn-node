import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'
const createKetQua = {
  maSV: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  maMH: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  diemThi: yup.number().default(0),
}

const getKetQuas = {
  maSV: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  maMH: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  diemThi: yup.number(),

  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string(),
}

const getKetQua = {
  ketQuaId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateKetQua = {
  ketQuaId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  maSV: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  maMH: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  diemThi: yup.number(),

  checkbox_selection: yup.string().when(['maSV', 'maMH', 'diemThi'], {
    is: (maSV, maMH, diemThi) => maSV && !maMH && !diemThi,
    then: yup.string().required(),
  }),
}

const deleteKetQua = {
  ketQuaId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export { createKetQua, getKetQuas, getKetQua, updateKetQua, deleteKetQua }
