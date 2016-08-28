import React, { PropTypes } from 'react';
import Time from 'react-time';

class MicroserviceView extends React.Component {

  componentDidMount() {
    this.props.getMicroservices();
  }
  render() {
    let rows = [];
    if (this.props.microservices.list) {
      for (let i = 0, length = this.props.microservices.list.length; i < length; i++) {
        const microservice = this.props.microservices.list[i];
        rows.push(
          <tr key={i}>
            <td>{microservice.name}</td>
            <td>{microservice.url}</td>
            <td><span title={microservice.infoStatus.error}>{microservice.status}</span></td>
            <td><Time value={microservice.infoStatus.lastCheck} titleFormat="YYYY/MM/DD HH:mm" relative /></td>
          </tr>);
      }
    }
    return (
      <div>
      </div>
    );
  }

}

MicroserviceView.propTypes = {
  microservices: PropTypes.object,
  getMicroservices: PropTypes.func,
};

export default MicroserviceView;
