import * as yup from 'yup';

export const elderlyUserProfileValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  age: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
