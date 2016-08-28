import React, { PropTypes } from 'react';

class NotificationView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification) {
      this.setState({ active: true });
    }
  }

  handleSnackbarTimeout() {
    this.setState({ active: false });
    this.props.clearNotification();
  }

  render() {

    return (
      <Snackbar
        action="Close"
        active={this.state.active}
        icon="question_answer"
        label={this.props.notification}
        timeout={2000}
        onClick={() => this.handleSnackbarClick()}
        onTimeout={() => this.handleSnackbarTimeout()}
        type="cancel"
      />
    );
  }

}

NotificationView.propTypes = {
  notification: PropTypes.string,
  clearNotification: PropTypes.func,
};

export default NotificationView;
