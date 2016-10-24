import React, { PropTypes } from 'react';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import tableStyle from '../../styles/components/c-table.scss';
import buttonStyle from '../../styles/components/c-button.scss';
import searchStyle from '../../styles/components/c-search.scss';

class EndpointView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      endpoints: null,
      filteredList: null,
      filterValue: null,
    };
  }

  componentDidMount() {
    this.props.getEndpoints();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.endpoints !== this.props.endpoints) {
      const newState = { endpoints: nextProps.endpoints.list };
      if (this.state.filterValue) {
        newState.filteredList = this.filterList(nextProps.endpoints.list, this.state.filterValue);
      } else {
        newState.filteredList = nextProps.endpoints.list;
      }
      this.setState(newState);
    }
  }

  filterList(list, value) {
    return list.filter((endpoint) => endpoint.path.toLowerCase().indexOf(value) >= 0);
  }

  filter(e) {
    const newState = { filterValue: e.target.value };
    if (e.target.value) {
      newState.filteredList = this.filterList(this.props.endpoints.list, e.target.value);
    } else {
      newState.filteredList = this.props.endpoints.list;
    }
    this.setState(newState);
  }

  render() {
    let rows = [];
    if (this.state.filteredList) {
      for (let i = 0, length = this.state.filteredList.length; i < length; i++) {
        const endpoint = this.state.filteredList[i];
        rows.push(
          <tr key={i}>
            <td>{endpoint.path}</td>
            <td>{endpoint.method}</td>
            <td>
              {endpoint.authenticated && 'Yes'}
            </td>
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
            placeholder="Search endpoints"
            onChange={(e) => this.filter(e)}
          >
          </input>
        </div>
        <button
          type="button"
          onClick={() => this.props.getEndpoints()}
          className={[buttonStyle['c-button'], buttonStyle['-basic'], buttonStyle['-small-table']].join(' ')}
        >Refresh result</button>
        <table>
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
