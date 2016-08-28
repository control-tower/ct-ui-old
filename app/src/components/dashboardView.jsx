import React, { PropTypes } from 'react';
import { Treemap, AreaChart } from 'react-d3';
import { Line } from 'react-chartjs';

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
          label: `${timeByRequest[i]._id.endpointPath} ${timeByRequest[i]._id.sourceMethod} (${ Math.floor(timeByRequest[i].sum * 100) / 100}ms)`,
          value: timeByRequest[i].sum,
        });
      }
    }

    return data;
  }
  formatRequestByDay(requestByDay) {
    const labels = [];
    const datasets = [{
      data: [],
      fillColor: 'rgba(220,220,220,0.2)',
      pointColor: 'rgba(220,220,220,1)',
      pointHighLigthFill: '#fff',
    }];
    if (requestByDay) {
      for (let i = 0, length = requestByDay.length; i < length; i++) {
        labels.push(`${requestByDay[i]._id.day}/${requestByDay[i]._id.month}/${requestByDay[i]._id.year}`);
        datasets[0].data.push(requestByDay[i].count);
      }
    }

    return {
      datasets,
      labels,
    };
  }

  handleChange(item, value) {
    this.setState({ ...this.state, [item]: value });
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }

}

DashboardView.propTypes = {
  getStadistics: PropTypes.func,
  stadistics: PropTypes.object,
};

export default DashboardView;
