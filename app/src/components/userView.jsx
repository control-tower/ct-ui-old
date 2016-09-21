import React, { PropTypes } from 'react';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import tableStyle from '../../styles/components/c-table.scss';
import buttonStyle from '../../styles/components/c-button.scss';
import searchStyle from '../../styles/components/c-search.scss';

class UserView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: null,
      filteredList: null,
      filterValue: null,
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users !== this.props.users) {
      const newState = { users: nextProps.users.list };
      if (this.state.filterValue) {
        newState.filteredList = this.filterList(nextProps.users.list, this.state.filterValue);
      } else {
        newState.filteredList = nextProps.users.list;
      }
      this.setState(newState);
    }
  }

  filterList(list, value) {
    return list.filter((user) => user.email.toLowerCase().indexOf(value) >= 0);
  }

  filter(e) {
    const newState = { filterValue: e.target.value };
    if (e.target.value) {
      newState.filteredList = this.filterList(this.props.users.list, e.target.value);
    } else {
      newState.filteredList = this.props.users.list;
    }
    this.setState(newState);
  }

  changeUser(e, user) {
    this.props.updateUser(user._id, { role: e.target.value });
  }

  render() {
    const roles = [
      {
        value: 'USER',
        label: 'User',
      }, {
        value: 'ADMIN',
        label: 'Admin',
      },
    ];
    let rows = [];
    let options = [
      <option value="USER" key="1">User</option>,
      <option value="ADMIN" key="2">Admin</option>,
    ];
    if (this.state.filteredList) {
      for (let i = 0, length = this.state.filteredList.length; i < length; i++) {
        const user = this.state.filteredList[i];
        rows.push(
          <tr key={i}>
            <td>{user._id}</td>
            <td>{user.email}</td>
            <td>{user.provider}</td>
            <td>
              <div className={tableStyle['content-select']}>
                <select onChange={(e) => this.changeUser(e, user)} value={user.role}>
                  {options}
                </select>
              </div>
            </td>
          </tr>);
      }
    }

    return (
      <div className={[layoutContentStyle['l-content'], tableStyle['c-table']].join(' ')}>
        <div className={searchStyle['c-search']}>
          <input
            type="search"
            id="jetsSearch"
            value={this.state.filterValue || ''}
            placeholder="search micro services"
            onChange={(e) => this.filter(e)}
          >
          </input>
        </div>
        <button
          type="button"
          onClick={() => this.props.getUsers()}
          className={[buttonStyle['c-button'], buttonStyle['-basic'], buttonStyle['-small-table']].join(' ')}
        >Refresh result</button>
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Email</td>
              <td>Provider</td>
              <td>Rol</td>
            </tr>
          </thead>
          <tbody>
           {rows}
          </tbody>
        </table>
      </div>
    );
  }

}

UserView.propTypes = {
  users: PropTypes.object,
  updateUser: PropTypes.func,
  getUsers: PropTypes.func
};

export default UserView;
