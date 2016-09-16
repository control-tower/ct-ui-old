import React, { PropTypes } from 'react';
import { Treemap, AreaChart } from 'react-d3';
import { Line } from 'react-chartjs';
import { DatePicker } from 'react-toolbox';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import dashboardStyle from '../../styles/components/c-dashboard.scss';
import buttonStyle from '../../styles/components/c-button.scss';

class DashboardView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      from: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
      to: new Date(),
    };
  }

  componentWillMount() {
    this.props.getStadistics(this.state.from, this.state.to);
  }

  componentWillReceiveProps(nextProps) {
    const timeByRequest = this.formatTimeByRequest(nextProps.stadistics.timeByRequest);
    const requestByDay = this.formatRequestByDay(nextProps.stadistics.requestByDay);
    this.setState({ timeByRequest, requestByDay });
  }

  filter() {
    this.props.getStadistics(this.state.from, this.state.to);
  }

  formatTimeByRequest(timeByRequest) {
    const data = [];
    if (timeByRequest) {
      for (let i = 0, length = timeByRequest.length; i < length; i++) {
        data.push({
          label: `${timeByRequest[i]._id.endpointPath} ${timeByRequest[i]._id.sourceMethod} (${Math.floor(timeByRequest[i].sum * 100) / 100}ms)`,
          value: timeByRequest[i].sum
        });
      }
    }

    return data;
  }
  formatRequestByDay(requestByDay) {
    const labels = [];
    const datasets = [
      {
        data: [],
        fillColor: 'rgba(220,220,220,0.2)',
        pointColor: 'rgba(220,220,220,1)',
        pointHighLigthFill: '#fff'
      }
    ];
    if (requestByDay) {
      for (let i = 0, length = requestByDay.length; i < length; i++) {
        labels.push(`${requestByDay[i]._id.day}/${requestByDay[i]._id.month}/${requestByDay[i]._id.year}`);
        datasets[0].data.push(requestByDay[i].count);
      }
    }

    return { datasets, labels };
  }

  handleChange(item, value) {
    this.setState({
      ...this.state,
      [item]: value,
    });
  }

  render() {
    return (
      <div className={layoutContentStyle['l-content']}>
        <div className={dashboardStyle['c-dashboard']}>
          <div className={dashboardStyle['contain-date']}>
            <div>
              <DatePicker
                label="From"
                onChange={(value) => this.handleChange('from', value)}
                value={this.state.from}
              />
            </div>
            <div>
              <DatePicker
                label="To"
                onChange={(value) => this.handleChange('to', value)}
                value={this.state.to}
              />
            </div>
            <div className={dashboardStyle['-button-refresh']}>
              <button type="button" className={[buttonStyle['c-button'], buttonStyle['-basic'], buttonStyle['-small-table']].join(' ')}>
                Refresh
              </button>
            </div>
          </div>
          <div className={dashboardStyle.chartPanel}>
            <span className={dashboardStyle.chartTitle}>Average time by request</span>
            <Treemap data={this.state.timeByRequest} width={450} height={250} textColor="#484848" fontSize="12px" hoverAnimation/>
          </div>
          <div className={dashboardStyle.chartPanel}>
            <span className={dashboardStyle.chartTitle}>Num request by day</span>
            {this.state.requestByDay && <Line data={this.state.requestByDay} width="450" height="250" />}
          </div>
        </div>
      </div>
    );
  }

}

DashboardView.propTypes = {
  getStadistics: PropTypes.func,
  stadistics: PropTypes.object,
};

export default DashboardView;
