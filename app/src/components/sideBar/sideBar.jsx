import React, { Component } from 'react';
import { Link } from 'react-router';
import sideBarStyles from '../../../styles/components/c-sidebar.scss';
import buttonStyle from '../../../styles/components/c-button.scss';

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }

  expandSideBar() {
    this.setState({ footerExpanded: !this.state.footerExpanded });
  }

  render() {
    return (
      <div className={sideBarStyles['c-sidebar']}>
        <div className={sideBarStyles['sidebar-top']}>
          <h1>control<br></br>tower.</h1>
          <Link
            className={(location.pathname === '/dashboard') ?
            [sideBarStyles['sidebar-option'], sideBarStyles['sidebar-option-selected']].join(' ') :
            sideBarStyles['sidebar-option']} to="dashboard"
          >Dashboard</Link>
          <Link
            className={(location.pathname === '/plugins') ?
            [sideBarStyles['sidebar-option'], sideBarStyles['sidebar-option-selected']].join(' ') :
            sideBarStyles['sidebar-option']} to="plugins"
          >Plugins</Link>
          <Link
            className={(location.pathname === '/microservices') ?
            [sideBarStyles['sidebar-option'], sideBarStyles['sidebar-option-selected']].join(' ') :
            sideBarStyles['sidebar-option']} to="microservices"
          >Microservices</Link>
          <Link
            className={(location.pathname === '/endpoints') ?
            [sideBarStyles['sidebar-option'], sideBarStyles['sidebar-option-selected']].join(' ') :
            sideBarStyles['sidebar-option']} to="endpoints"
          >Endpoints</Link>
          <Link
            className={(location.pathname === '/users') ?
            [sideBarStyles['sidebar-option'], sideBarStyles['sidebar-option-selected']].join(' ') :
            sideBarStyles['sidebar-option']} to="users"
          >Users</Link>
          <Link
            className={(location.pathname === '/profile' || location.pathname === '/') ?
            [sideBarStyles['sidebar-option'], sideBarStyles['sidebar-option-selected']].join(' ') :
            sideBarStyles['sidebar-option']} to="profile"
          >Profile</Link>
        </div>
        <div className={sideBarStyles['sidebar-bottom']}>
          <button
            className={[buttonStyle['c-button'], buttonStyle['-blue']].join(' ')}
            onClick={() => this.props.logout()}
          >logout</button>
        </div>
      </div>
    );
  }

}

SideBar.propTypes = {
  expandSideBa: React.PropTypes.func,
  logout: React.PropTypes.func,
};

export default SideBar;
