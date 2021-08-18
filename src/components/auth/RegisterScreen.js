import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { setError, unsetError } from '../../actions/ui';
import { registerEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { loading, msgError } = useSelector(state => state.ui)

  const { values, handleInputChange } = useForm({
    name: 'Daniel',
    email: 'colmenarescdaniel@gamil.com',
    password: '123456',
    confirm: '123456'
  })

  const { name, email, password, confirm } = values

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(registerEmailPassword(email, password, name))
    }
  }

  const isFormValid = () => {
    if (name.trim().length <= 0) {
      dispatch(setError("Name is required"))
      return false
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"))
      return false
    } else if (password !== confirm || password.length <= 5) {
      dispatch(setError("Password should be at least 6 characters and match each other"))
      return false
    }

    dispatch(unsetError());
    return true
  }

  return (
    <div className="animate__animated animate__fadeIn animate__faster">
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        {
          !!msgError &&
          (<div className="auth__alert-error ">
            {msgError}
          </div>)
        }
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          className="auth__input"
          value={confirm}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
          disabled={loading}
        >
          Register
        </button>
        <Link
          to="/auth/login"
          className="link"
        >
          Already registered?
        </Link>
      </form>
    </div>
  )
}
