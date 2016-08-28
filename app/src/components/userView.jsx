import React, { PropTypes } from 'react';

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
            </td>
          </tr>);
      }
    }

    return (
      <div>

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
