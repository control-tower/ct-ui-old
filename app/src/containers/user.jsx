import { connect } from 'react-redux';

import User from '../components/userView';
import { getUsers, updateUser } from '../actions/users';

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  updateUser: (id, user) => dispatch(updateUser(id, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
