import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'
const createKhoa = {
  tenKhoa: yup.string().required(),
  soCBGD: yup.number().required(),
}

const getKhoas = {
  tenKhoa: yup.string(),
  soCBGD: yup.number(),

  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string(),
}

const getKhoa = {
  khoaId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateKhoa = {
  khoaId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),

  tenKhoa: yup.string(),
  soCBGD: yup.number(),

  checkbox_selection: yup.string().when(['tenKhoa', 'soCBGD'], {
    is: (tenKhoa, soCBGD) => !tenKhoa && !soCBGD,
    then: yup.string().required(),
  }),
}

const deleteKhoa = {
  khoaId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export { createKhoa, getKhoas, getKhoa, updateKhoa, deleteKhoa }
