import * as yup from 'yup';
import { FormInputsNames } from '../../models/form';

export default yup.object({
  [FormInputsNames.LOGIN]: yup.string()
    .required()
    .trim()
    .min(5),
  [FormInputsNames.PASSWORD]: yup.string()
    .required()
    .trim()
    .min(5),
})
  .required();
