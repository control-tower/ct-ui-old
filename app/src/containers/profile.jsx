import { connect } from 'react-redux';

import Profile from '../components/profileView';
import { generateToken } from '../actions/login';

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  generateToken: () => dispatch(generateToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
