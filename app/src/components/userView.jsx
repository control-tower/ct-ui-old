import React, { PropTypes } from 'react';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import tableStyle from '../../styles/components/c-table.scss'

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
            <td>{user.email}</td>
            <td>{user.provider}</td>
            <td>
              <select onChange={(e) => this.changeUser(e, user)}>
                <option>Admin</option>
              </select>
            </td>
          </tr>);
      }
    }

    return (
      <div className={[layoutContentStyle['l-content'], tableStyle['c-table']].join(' ')}>
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
