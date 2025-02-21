import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuthStore } from '../store/useAuthStore';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';

const LoginPage = () => {
   const {login, isLoggingIn}= useAuthStore();
   const  navigate = useNavigate();

   const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('email is required'),
    password: Yup.string().min(6,'password must be of 6 characters').required('password is required')
   });

   const handleSubmit = async (values, {setSubmitting}) => {
    try{
      await login(values);
      navigate('/');
    }
    catch(error){
      toast.error("login failed, please check your credentials");
    }
    setSubmitting(false);
   }

  return (
    <div className="container">
      <div className="row ">
        <div className="d-flex justify-content-center align-items-center6">
          <Card className="mt-5 p-4">
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="mt-4">
                    {/* Email Field */}
                    <div className="mb-3">
                      <label>Email Address</label>
                      <Field type="email" name="email" className="form-control" placeholder="Enter email" />
                      <ErrorMessage name="email" component="div" className="text-danger small" />
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                      <label>Password</label>
                      <Field type="password" name="password" className="form-control" placeholder="Enter password" />
                      <ErrorMessage name="password" component="div" className="text-danger small" />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <Button type="submit" className="w-100" variant="primary" disabled={isLoggingIn || isSubmitting}>
                        {isLoggingIn || isSubmitting ? 'Logging in...' : 'Login'}
                      </Button>
                    </div>

                    {/* Signup Link */}
                    <div className="mt-3 text-center">
                      <p>Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>
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

export default LoginPage ;