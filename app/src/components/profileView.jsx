import React, { PropTypes } from 'react';
import {
  Button,
  FontIcon,
  Input,
} from 'react-toolbox';
import CopyToClipboard from 'react-copy-to-clipboard';
import generalStyle from '../../styles/general';

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
      <div>
        <h2>
          <FontIcon value="face" className={generalStyle.mainIcon} />
          Profile
        </h2>
        <Input type="text" label="Token" name="token" icon="vpn_key" value={this.state.token} disabled />
        <Button label="Generate token" icon="refresh" onClick={() => this.props.generateToken()} accent />
        {this.state.token && <CopyToClipboard text={this.state.token} onCopy={() => this.setState({ copied: true })}>
          <Button label={!this.state.copied ? 'Copy' : 'Copied'} icon="content_copy" accent />
        </CopyToClipboard>}
        <p>
          Add header:  Authorization: Bearer {this.state.token ? this.state.token : '<token>'};
        </p>
      </div>
    );
  }

}

ProfileView.propTypes = {
  generateToken: PropTypes.func,
  login: PropTypes.object,
};

export default ProfileView;
