import React, { PropTypes } from 'react';
import SideBar from '../containers/sideBar/sideBar';
import { GrowlerContainer } from 'flash-notification-react-redux';

class AppView extends React.Component {

  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false,
  };

  componentWillMount() {
    this.props.checkLogin();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.login.correct === false && this.props.login.correct !== nextProps.login.correct) {
      this.props.goToLogin();
    }
  }

  toggleDrawerActive = () => {
    this.setState({
      drawerActive: !this.state.drawerActive,
    });
  };

  logout() {
    this.props.logout();
  }

  render() {
    console.log(GrowlerContainer);
    return (
      <div>
        <GrowlerContainer />
        <SideBar />
        {this.props.children}
      </div>

    );
  }

}

AppView.propTypes = {
  children: PropTypes.node,
  push: PropTypes.func,
  checkLogin: PropTypes.func,
  logout: PropTypes.func,
  login: PropTypes.object,
};

export default AppView;
