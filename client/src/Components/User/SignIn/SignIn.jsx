import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../../features/api/apiSlice'; // Import the hook
import "./SignIn.css";

export const SignIn = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is Required.'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is Required.'),
  });

  return (
    <div className='signin'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const result = await signIn(values).unwrap();
            // Store the token in localStorage
            localStorage.setItem('token', result.token);
            // Redirect to a protected route or dashboard
            navigate('/dashboard');
          } catch (error) {
            // Handle errors
            if (error.status === 404) {
              setFieldError('email', 'Email does not exist');
            } else if (error.status === 401) {
              setFieldError('password', 'Wrong password and email combination');
            } else {
              setFieldError('general', 'An error occurred during login');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className='signinform'>
            <h2>Sign In</h2>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            {errors.general && <div className="error-message">{errors.general}</div>}
            <button type="submit" disabled={isSubmitting || isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <div>Forgot password? <Link to="/requestpasswordresetmail">Reset</Link></div>
          </Form>
        )}
      </Formik>

      <div className='signupdiv'>Don't have an account?
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};