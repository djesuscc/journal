import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

export const PublicRoutes = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        !isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

PublicRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}
