import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'
const createMonHoc = {
  tenMH: yup.string().required(),
  soTiet: yup.number().required(),
}

const getMonHocs = {
  tenMH: yup.string(),
  soTiet: yup.number(),

  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string(),
}

const getMonHoc = {
  monHocId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateMonHoc = {
  monHocId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  tenMH: yup.string(),
  soTiet: yup.number(),
  checkbox_selection: yup.string().when(['tenMH', 'soTiet'], {
    is: (tenMH, soTiet) => !tenMH && !soTiet,
    then: yup.string().required(),
  }),
}

const deleteMonHoc = {
  monHocId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export { createMonHoc, getMonHocs, getMonHoc, updateMonHoc, deleteMonHoc }
