import React, { PropTypes } from 'react';
import {
  AppBar,
  IconButton,
  Layout,
  NavDrawer,
  Panel,
  Navigation,
  Button,
} from 'react-toolbox';
import menu from '../../styles/menu';
import generalStyles from '../../styles/general';
import Notification from '../containers/notification';

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
      this.props.push('login');
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
    return (
      <Layout>
        <NavDrawer active={this.state.drawerActive} pinned={this.state.drawerPinned} permanentAt="xxxl" onOverlayClick={this.toggleDrawerActive}>
          <AppBar>
            Menu
          </AppBar>
          <Navigation type="vertical" className={menu.listMenu}>
            {this.props.login.user && this.props.login.user.role === 'ADMIN' && <Button label="Dashboard" icon="timeline" onClick={() => this.props.push('dashboard')} />}
            {this.props.login.user && this.props.login.user.role === 'ADMIN' && <Button label="Plugins" icon="extension" onClick={() => this.props.push('plugins')} />}
            {this.props.login.user && this.props.login.user.role === 'ADMIN' && <Button label="Microservices" icon="cloud" onClick={() => this.props.push('microservices')} />}
            {this.props.login.user && this.props.login.user.role === 'ADMIN' && <Button label="Endpoints" icon="navigation" onClick={() => this.props.push('endpoints')} />}
            {this.props.login.user && this.props.login.user.role === 'ADMIN' && <Button label="Users" icon="account_circle" onClick={() => this.props.push('users')} />}
            {this.props.login.user && <Button label="Profile" icon="face" onClick={() => this.props.push('profile')} />}
            {this.props.login.user && <Button label="Logout" icon="lock_open" onClick={() => this.logout()} />}
            {!this.props.login.user && <Button label="Login" icon="lock_outline" onClick={() => this.props.push('login')} />}
          </Navigation>
        </NavDrawer>
        <Panel>
          <AppBar>
            <IconButton icon="menu" inverse onClick={this.toggleDrawerActive} />
            <h3>Api Gateway</h3>
          </AppBar>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '3.5rem 6rem',
            }}
          >
            {this.props.children}
          </div>
          <Notification />
        </Panel>

      </Layout>
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
