import { connect } from 'react-redux';

import Notification from '../components/notificationView';
import { clearNotification } from '../actions/notification';

const mapStateToProps = (state) => ({
  notification: state.notification,
});

const mapDispatchToProps = (dispatch) => ({
  clearNotification: () => dispatch(clearNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
