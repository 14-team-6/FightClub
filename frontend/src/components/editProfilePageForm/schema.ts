import * as yup from 'yup';
import { FormInputsNames } from '../../models/form';
import { phoneRegExp } from '../../../consts/regexp';

export default yup.object({
  [FormInputsNames.LOGIN]: yup.string()
    .required()
    .trim()
    .min(5),
  [FormInputsNames.DISPLAY_NAME]: yup.string()
    .trim()
    .min(5),
  [FormInputsNames.FIRST_NAME]: yup.string()
    .required('First name is required field')
    .trim()
    .min(2),
  [FormInputsNames.SECOND_NAME]: yup.string()
    .required('Second name is required field')
    .trim()
    .min(2),
  [FormInputsNames.EMAIL]: yup.string()
    .required()
    .email(),
  [FormInputsNames.PHONE]: yup.string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(5),
})
  .required();
