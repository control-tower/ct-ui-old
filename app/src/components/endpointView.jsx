import React, { PropTypes } from 'react';


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

EndpointView.propTypes = {
  endpoints: PropTypes.object,
  getEndpoints: PropTypes.func,
};

export default EndpointView;
