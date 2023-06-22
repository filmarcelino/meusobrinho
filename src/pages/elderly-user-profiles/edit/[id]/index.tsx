import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getElderlyUserProfileById, updateElderlyUserProfileById } from 'apiSdk/elderly-user-profiles';
import { Error } from 'components/error';
import { elderlyUserProfileValidationSchema } from 'validationSchema/elderly-user-profiles';
import { ElderlyUserProfileInterface } from 'interfaces/elderly-user-profile';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function ElderlyUserProfileEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ElderlyUserProfileInterface>(
    () => (id ? `/elderly-user-profiles/${id}` : null),
    () => getElderlyUserProfileById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ElderlyUserProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateElderlyUserProfileById(id, values);
      mutate(updated);
      resetForm();
      router.push('/elderly-user-profiles');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ElderlyUserProfileInterface>({
    initialValues: data,
    validationSchema: elderlyUserProfileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Elderly User Profile
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="first_name" mb="4" isInvalid={!!formik.errors?.first_name}>
              <FormLabel>First Name</FormLabel>
              <Input type="text" name="first_name" value={formik.values?.first_name} onChange={formik.handleChange} />
              {formik.errors.first_name && <FormErrorMessage>{formik.errors?.first_name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="last_name" mb="4" isInvalid={!!formik.errors?.last_name}>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" name="last_name" value={formik.values?.last_name} onChange={formik.handleChange} />
              {formik.errors.last_name && <FormErrorMessage>{formik.errors?.last_name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="age" mb="4" isInvalid={!!formik.errors?.age}>
              <FormLabel>Age</FormLabel>
              <NumberInput
                name="age"
                value={formik.values?.age}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('age', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.age && <FormErrorMessage>{formik.errors?.age}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'elderly_user_profile',
  operation: AccessOperationEnum.UPDATE,
})(ElderlyUserProfileEditPage);
