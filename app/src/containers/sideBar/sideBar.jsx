import { connect } from 'react-redux';

import Sidebar from '../../components/sideBar/sideBar';
import { logout } from '../../actions/login';

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
