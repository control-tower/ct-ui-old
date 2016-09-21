import React, { PropTypes } from 'react';
import Time from 'react-time';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import tableStyle from '../../styles/components/c-table.scss';
import buttonStyle from '../../styles/components/c-button.scss';
import searchStyle from '../../styles/components/c-search.scss';

class MicroserviceView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      microservices: null,
      filteredList: null,
      filterValue: null,
    };
  }
  componentDidMount() {
    this.props.getMicroservices();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.microservices !== this.props.microservices) {
      const newState = { microservices: nextProps.microservices.list };
      if (this.state.filterValue) {
        newState.filteredList = this.filterList(nextProps.microservices.list, this.state.filterValue);
      } else {
        newState.filteredList = nextProps.microservices.list;
      }
      this.setState(newState);
    }
  }

  filterList(list, value) {
    return list.filter((microservice) => microservice.name.toLowerCase().indexOf(value) >= 0);
  }

  filter(e) {
    const newState = { filterValue: e.target.value };
    if (e.target.value) {
      newState.filteredList = this.filterList(this.props.microservices.list, e.target.value);
    } else {
      newState.filteredList = this.props.microservices.list;
    }
    this.setState(newState);
  }

  render() {
    let rows = [];
    if (this.state.filteredList) {
      for (let i = 0, length = this.state.filteredList.length; i < length; i++) {
        const microservice = this.state.filteredList[i];
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
            value={this.state.filterValue || ''}
            placeholder="search micro services"
            onChange={(e) => this.filter(e)}
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
