import React, { PropTypes } from 'react';
class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.login.correct === true) {
      this.props.push('/dashboard');
    }
  }

  handleChange(name, value) {
    this.setState({ ...this.state, [name]: value });
  }

  doLogin(provider) {
    window.location = `http://api2.gateway.dev:9000/auth/${provider}`;
  }

  basicLogin() {
    this.props.checkLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className={loginStyle.loginPanel}>
        <h3>Login</h3>
        <Input className={loginStyle.input} type="text" label="Username" name="username" value={this.state.username} onChange={this.handleChange.bind(this, "username")} />
        <Input type="password" label="Password" name="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} />
        <Button label="Login" raised primary onClick={() => this.basicLogin()} />
        <hr></hr>
        <Button label="Login with Twitter" raised primary onClick={() => this.doLogin('twitter')} flat />
        <Button label="Login with Google" raised primary onClick={() => this.doLogin('google')} flat />
        <Button label="Login with Facebook" raised primary onClick={() => this.doLogin('facebook')} flat />
      </div>
    );
  }

}

LoginView.propTypes = {
  push: PropTypes.func,
  checkLogin: PropTypes.func,
  login: PropTypes.object,
};

export default LoginView;
