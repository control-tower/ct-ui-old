import { connect } from 'react-redux';

import App from '../components/appView';
import { push } from 'react-router-redux';
import { login, logout } from '../actions/login';

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  push: (where) => dispatch(push(where)),
  checkLogin: () => dispatch(login()),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
