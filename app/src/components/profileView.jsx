import React, { PropTypes } from 'react';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.token !== this.state.token) {
      this.setState({ token: nextProps.login.token });
    }
  }

  render() {
    return (
      <div className={layoutContentStyle['l-content']}>
        <div className={profileStyle['c-profile-page']}>
          <div className={profileStyle['text-token']}>
            lasjdn823g8egfuh43hf34hf874dnisdou
            if948h98h98h98h948hf98h9we8hf9w8hf9w
            e8hf9we8hf9wehf9wehf9wehf9wehf9wehf9we
            hf9wehf9wehf9wehf9wehf9wef9wehf9
            we8hf9wh89f8hw9f8hw9fhw9fh9wfh9w8
          </div>
          <hr></hr>
          <div className={profileStyle['content-buttons']}>
            <button
              type="button"
              className={[buttonStyle['c-button'], buttonStyle['-basic']].join(' ')}
            >Generate token</button>
            <button
              type="button"
              className={[buttonStyle['c-button'], buttonStyle['-basic']].join(' ')}
            >Copied</button>
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
