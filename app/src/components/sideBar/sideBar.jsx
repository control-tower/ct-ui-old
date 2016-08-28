import React, { Component } from 'react';
import { Link } from 'react-router';
import sideBarStyles from '../../../styles/components/c-sidebar.scss';

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
          <div>
            <img src="https://s3.postimg.org/97z9chtlv/logo_Side_Bar.png" alt="logo"></img>
          </div>
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
          >End points</Link>
          <Link
            className={(location.pathname === '/users') ?
            [sideBarStyles['sidebar-option'], sideBarStyles['sidebar-option-selected']].join(' ') :
            sideBarStyles['sidebar-option']} to="users"
          >Users</Link>
          <Link
            className={(location.pathname === '/profile') ?
            [sideBarStyles['sidebar-option'], sideBarStyles['sidebar-option-selected']].join(' ') :
            sideBarStyles['sidebar-option']} to="profile"
          >Profile</Link>
        </div>
        <div className={sideBarStyles['sidebar-bottom']}></div>
      </div>
    );
  }

}

SideBar.propTypes = {
  expandSideBa: React.PropTypes.func,
};

export default SideBar;
