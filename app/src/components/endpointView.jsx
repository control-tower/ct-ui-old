import React, { PropTypes } from 'react';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import tableStyle from '../../styles/components/c-table.scss';
import buttonStyle from '../../styles/components/c-button.scss';

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
              {endpoint.authenticated && 'Yes'}
            </td>
          </tr>);
      }
    }
    return (
      <div className={[layoutContentStyle['l-content'], tableStyle['c-table']].join(' ')}>
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
