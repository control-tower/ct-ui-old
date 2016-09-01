import React, { PropTypes } from 'react';
import { Treemap, AreaChart } from 'react-d3';
import { Line } from 'react-chartjs';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import dashboardStyle from '../../styles/components/c-dashboard.scss';

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
    const treemapData = [{ label: 'Data1', value: 1364 },
    { label: 'Data2', value: 1296 },
    { label: 'Data3', value: 318 },
    { label: 'Data4', value: 251 },
    { label: 'Data5', value: 203 }];
    return (
      <div className={layoutContentStyle['l-content']}>
        <div className={dashboardStyle['c-dashboard']}>
          <div className={dashboardStyle['contain-date']}>
            <div>
              <b>From:</b>
              <input type="date"></input>
            </div>
            <div>
              <b>To:</b>
              <input type="date"></input>
            </div>
          </div>
          <Treemap
            data={treemapData}
            width={450}
            height={250}
            textColor="#484848"
            fontSize="12px"
            hoverAnimation
          />
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
