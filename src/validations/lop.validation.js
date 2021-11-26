import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'
const createLop = {
  tenLop: yup.string().required(),
  maKhoa: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const getLops = {
  tenLop: yup.string(),
  maKhoa: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string(),
}

const getLop = {
  lopId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateLop = {
  lopId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  tenLop: yup.string(),
  maKhoa: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  checkbox_selection: yup.string().when(['tenLop', 'maKhoa'], {
    is: (tenLop, maKhoa) => !tenLop && !maKhoa,
    then: yup.string().required(),
  }),
}

const deleteLop = {
  lopId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export { createLop, getLops, getLop, updateLop, deleteLop }
