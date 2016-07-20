import { connect } from 'react-redux';

import Login from '../components/loginView';
import { push } from 'react-router-redux';
import { login } from '../actions/login';

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  push: (where) => dispatch(push(where)),
  checkLogin: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
