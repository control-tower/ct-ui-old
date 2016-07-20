import React, { PropTypes } from 'react';
import generalStyle from '../../styles/general';
import { Button, FontIcon } from 'react-toolbox';


class EndpointView extends React.Component {

  componentDidMount() {
    this.props.getEndpoints();
  }
  render() {
    let rows = [];
    if (this.props.endpoints.list) {
      for (let i = 0, length = this.props.endpoints.list.length; i < length; i++) {
        const endpoint = this.props.endpoints.list[i];
        rows.push(
          <tr key={i}>
            <td>{endpoint.path}</td>
            <td>{endpoint.method}</td>
            <td>
              {endpoint.authenticated && <FontIcon value="vpn_key" />}
            </td>
          </tr>);
      }
    }
    return (
      <div>
        <h2>
          <FontIcon value="navigation" className={generalStyle.mainIcon} />
          Endpoints
          <Button label="" icon="refresh" onClick={() => this.props.getEndpoints()} />
        </h2>
        <table className={generalStyle.mainTable}>
          <thead>
            <tr>
              <td>Path</td>
              <td>Method</td>
              <td>Authenticated</td>
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

EndpointView.propTypes = {
  endpoints: PropTypes.object,
  getEndpoints: PropTypes.func,
};

export default EndpointView;
