import React, { PropTypes } from 'react';
import Time from 'react-time';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import tableStyle from '../../styles/components/c-table.scss';
import buttonStyle from '../../styles/components/c-button.scss';
import searchStyle from '../../styles/components/c-search.scss';

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
          <tr key={i} className={"list-table"}>
            <td>{microservice.name}</td>
            <td>{microservice.url}</td>
            <td><span>{microservice.status}</span></td>
            <td><Time value={microservice.infoStatus.lastCheck} titleFormat="YYYY/MM/DD HH:mm" relative /></td>
          </tr>);
      }
    }

    return (
      <div className={[layoutContentStyle['l-content'], tableStyle['c-table']].join(' ')}>
        <div className={searchStyle['c-search']}>
          <input
            type="search"
            id="jetsSearch"
            placeholder="search micro services"
          >
          </input>
        </div>
        <button
          type="button"
          onClick={() => this.props.getMicroservices()}
          className={[buttonStyle['c-button'], buttonStyle['-basic'], buttonStyle['-small-table']].join(' ')}
        >Refresh result</button>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Url</td>
              <td>Status</td>
              <td>Last check</td>
            </tr>
          </thead>
          <tbody id="jetsContent">
            {rows}
          </tbody>
        </table>
      </div>
    );
  }

}

MicroserviceView.propTypes = {
  microservices: PropTypes.object,
  getMicroservices: PropTypes.func,
};

export default MicroserviceView;
