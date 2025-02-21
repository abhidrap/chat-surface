import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '../store/useAuthStore';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignupSchema = Yup.object().shape({
  fullname: Yup.string().trim().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  return (
    <div className='container'>
      <div className='row'>
        <div className='d-flex justify-content-center align-items-center'>
          <Card className='mt-5 p-3'>
            <Card.Body>
              <Card.Title>Create Account</Card.Title>
              <Card.Text>Start with your free account</Card.Text>

              <Formik
                initialValues={{ fullname: '', email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                  signup(values)
                    .then(() => toast.success('Account created successfully'))
                    .catch((err) => toast.error(err.message))
                    .finally(() => setSubmitting(false));
                }}
              >
                {({ isSubmitting }) => (
                  <Form className='mt-5'>
                    <div className='mb-3'>
                      <label>Full Name</label>
                      <Field type='text' name='fullname' className='form-control' placeholder='Enter Full Name' />
                      <ErrorMessage name='fullname' component='div' className='text-danger' />
                    </div>

                    <div className='mb-3'>
                      <label>Email address</label>
                      <Field type='email' name='email' className='form-control' placeholder='Enter email' />
                      <ErrorMessage name='email' component='div' className='text-danger' />
                    </div>

                    <div className='mb-3'>
                      <label>Password</label>
                      <Field type={showPassword ? 'text' : 'password'} name='password' className='form-control' placeholder='Password' />
                      <ErrorMessage name='password' component='div' className='text-danger' />
                    </div>

                    <div className='mb-3'>
                      <input
                        type='checkbox'
                        onChange={() => setShowPassword(!showPassword)}
                        checked={showPassword}
                      />{' '}
                      Show Password
                    </div>

                    <div className='text-center mt-5'>
                      <Button className='w-100' variant='primary' type='submit' disabled={isSubmitting || isSigningUp}>
                        {isSigningUp ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </div>

                    <div className='mt-2'>
                      <p>
                        Already have an account? <Link to='/login' className='text-primary'>Login</Link>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
