import React, { PropTypes } from 'react';
import { Button, FontIcon, Dropdown } from 'react-toolbox';
import generalStyle from '../../styles/general';
import userStyle from '../../styles/user';

class UserView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUsers();
  }

  changeUser(value, user) {
    this.props.updateUser(user._id, { role: value });
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
    if (this.props.users.list) {
      for (let i = 0, length = this.props.users.list.length; i < length; i++) {
        const user = this.props.users.list[i];
        rows.push(
          <tr key={i}>
            <td>{user._id}</td>
            <td>{user.provider}</td>
            <td>
              <Dropdown
                auto
                onChange={(e) => this.changeUser(e, user)}
                source={roles}
                value={user.role}
              />
            </td>
          </tr>);
      }
    }

    return (
      <div>
        <h2>
          <FontIcon value="account_circle" className={generalStyle.mainIcon} />
          Users
          <Button label="" icon="refresh" onClick={() => this.props.getUsers()} />
        </h2>
        <table className={generalStyle.mainTable}>
          <thead>
            <tr>
              <td>Id</td>
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
