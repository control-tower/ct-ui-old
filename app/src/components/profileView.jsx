import React, { PropTypes } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import profileStyle from '../../styles/components/c-profile-page.scss';
import buttonStyle from '../../styles/components/c-button.scss';

class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: props.login.token,
    };
  }

  componentDidMount() {
    this.props.generateToken();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.token !== this.state.token) {
      this.setState({ token: nextProps.login.token });
    }
  }

  render() {
    return (
      <div className={[layoutContentStyle['l-content'], layoutContentStyle['-basic']].join(' ')}>
        <div className={profileStyle['c-profile-page']}>
          <div className={profileStyle['text-token']}>
            {this.state.token}
          </div>
          <hr></hr>
          <div className={profileStyle['content-buttons']}>
            <button
              type="button"
              onClick={() => this.props.generateToken()}
              className={[buttonStyle['c-button'], buttonStyle['-basic']].join(' ')}
            >Generate token</button>
            {this.state.token && <CopyToClipboard text={this.state.token} onCopy={() => this.setState({ copied: true })}>
              <button
                type="button"
                className={[buttonStyle['c-button'], buttonStyle['-basic']].join(' ')}
              >{!this.state.copied ? 'Copy' : 'Copied'}</button>
            </CopyToClipboard>}
          </div>
        </div>
      </div>
    );
  }

}

ProfileView.propTypes = {
  generateToken: PropTypes.func,
  login: PropTypes.object,
};

export default ProfileView;
