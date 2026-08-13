import { KeyboardAvoidingView, Text, View ,ActivityIndicator} from 'react-native';
import React from 'react';
import InputFields from '../../components/Forms/InputFields';
import { Formik } from 'formik';
import { validationSchema } from '../../utils/validationSchema';

import PrimaryButton from '../../components/Button/PrimaryButton';

import useSignUpApi from './useSignUpApi';
const SignUp = () => {

const {signUp,loading}= useSignUpApi()
  return (
  <KeyboardAvoidingView
  style={{flex:1, justifyContent:'center',padding:20

  }}
  >
      <Text style={{fontSize:30, fontWeight:'bold', marginBottom:20}}>Create Account</Text>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
       onSubmit={async (values,{  resetForm}) => {
    
  console.log(values);
  const success = await signUp(values)
  if(success){
    resetForm()
  }

  await signUp(values);

}}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>

            {/* Name */}
            <InputFields
              icon="logo-ionic"
              placeholder="Enter Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={() => handleBlur('name')}
            />

            {touched.name && errors.name && (
              <Text style={{color:'red'}}>{errors.name}</Text>
            )}

            {/* Email */}
            <InputFields
              placeholder="Enter Email"
                  icon="mail"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => handleBlur('email')}
            />

            {touched.email && errors.email && (
              <Text style={{color:'red'}}>{errors.email}</Text>
            )}

            {/* Password */}
            <InputFields
              icon="lock-closed"
              placeholder="Enter Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => handleBlur('password')}
              secureTextEntry
            />

            {touched.password && errors.password && (
              <Text style={{color:'red'}}>{errors.password}</Text>
            )}

            {/* Confirm Password */}
            <InputFields
              icon="lock-closed"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => handleBlur('confirmPassword')}
              secureTextEntry
            />

            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={{color:'red'}}>{errors.confirmPassword}</Text>
            )}

           
           <PrimaryButton
  title="Register"
  onPress={handleSubmit}
  loading={loading}
  disabled={loading}
/>

          </View>
        )}
      </Formik>
  </KeyboardAvoidingView>
  );
};

export default SignUp;