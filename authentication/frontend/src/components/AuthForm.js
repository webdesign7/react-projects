import { useState, useEffect } from 'react';
import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (actionData?.success) {
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  }, [actionData]);

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        
        {actionData?.error && (
          <div className={classes.error}>
            {actionData.error}
          </div>
        )}
        
        {actionData?.success && (
          <div className={classes.success}>
            {actionData.message}
          </div>
        )}
        
        <p>
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            required 
            defaultValue={actionData?.email || ''}
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            required 
            minLength={isLogin ? 6 : 8}
          />
          {!isLogin && (
            <small className={classes.helpText}>
              Password must be at least 8 characters with letters and numbers
            </small>
          )}
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
