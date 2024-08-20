import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSignUpMutation } from '../../../features/api/apiSlice';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignUp = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required(' Email is Required.'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required(' Password is Required.'),
  });

  return (
    <div className='signup'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await signUp(values).unwrap();
            // console.log('Signup successful');

            toast.success("Registration successful! Please sign in.");
 

            // Redirect to login page or show success message
            setTimeout(() => navigate('/signin'), 3000);
          } catch (err) {
            console.error('Signup failed:', err);
            if (err.status === 400) {
              setFieldError('email', 'Invalid email or password');
              setFieldError('password', 'Invalid email or password');
            } else if (err.status === 409) {
              setFieldError('email', 'Email already exists');
            } else {
              setFieldError('general', 'An error occurred during signup');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className='signupform'>
                  <h2>Sign Up</h2>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            {errors.general && <div className="error-message">{errors.general}</div>}
            <button type="submit" disabled={isSubmitting || isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};