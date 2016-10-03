import React, { PropTypes } from 'react';
import { Treemap, AreaChart } from 'react-d3';
import { Line } from 'react-chartjs';
import { DatePicker } from 'react-toolbox';
import _ from 'lodash';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import dashboardStyle from '../../styles/components/c-dashboard.scss';
import buttonStyle from '../../styles/components/c-button.scss';

import usaSvg from '../../assets/maps/usa.svg';

class DashboardView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      from: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
      to: new Date(),
      windowWidth: window.innerWidth - 40 - 250,
      optionselect: 2,
    };

    this.handleResize = _.debounce(this.handleResize.bind(this), 50);
  }

  componentWillMount() {
    this.props.getStadistics(this.state.from, this.state.to);
    this.props.getMicroservice();
    this.props.getUsers();
    this.props.getEndpoints();
  }

  componentWillReceiveProps(nextProps) {
    const timeByRequest = this.formatTimeByRequest(nextProps.stadistics.timeByRequest);
    const requestByDay = this.formatRequestByDay(nextProps.stadistics.requestByDay);
    this.setState({ timeByRequest, requestByDay });
  }

  componentDidUpdate() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth - 40 - 250 });
  }

  filter() {
    this.props.getStadistics(this.state.from, this.state.to);
  }

  changeOption(value) {
    this.setState({ optionselect: value });
  }

  formatTimeByRequest(timeByRequest) {
    const data = [];
    if (timeByRequest) {
      for (let i = 0, length = timeByRequest.length; i < length; i++) {
        if (data && data.length >= 10) {
          break;
        }
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
    const countries = [];
    if (this.props.stadistics.countRequestTodayByCountry) {
      const length = this.props.stadistics.countRequestTodayByCountry.length;

      for (let i = 0; i < length; i++) {
        if (countries.length >= 4) {
          break;
        }
        const country = this.props.stadistics.countRequestTodayByCountry[i];
        if (country && country._id) {
          countries.push(<div className={dashboardStyle['contain-map']}  key={i}><div>
          <span className={`mg huge map-${country._id.toLowerCase()}`}></span>
          <span className={dashboardStyle['text-country']}><b>{country._id}</b><br></br>{country.count}</span></div></div>);
        }
      }
    }
    return (
      <div className={layoutContentStyle['l-content']}>
        <div className={dashboardStyle['c-dashboard']}>
          <div className={dashboardStyle['contain-options']}>
            <button
              type="button"
              className={(this.state.optionselect == 2) ? dashboardStyle['-select'] : null}
              onClick={() => this.changeOption(2)}
            >
              Numbers
            </button>
            <button
              type="button"
              onClick={() => this.changeOption(1)}
              className={(this.state.optionselect === 1) ? dashboardStyle['-select'] : null}
            >
              Tables
            </button>
          </div>
          {this.state.optionselect === 1 && <div>
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
                <button
                  type="button"
                  className={[buttonStyle['c-button'], buttonStyle['-basic'], buttonStyle['-small-table']].join(' ')}
                  onClick={() => this.filter()}
                >
                  Refresh
                </button>
              </div>
            </div>
            <div className={dashboardStyle.chartPanel}>
              <span
                className={[dashboardStyle.chartTitle, dashboardStyle['-first']].join(' ')}
              >Average time by request</span>
              <Treemap
                data={this.state.timeByRequest}
                width={this.state.windowWidth}
                height={300}
                textColor="#484848"
                fontSize="12px"
                hoverAnimation
              />
            </div>
            <div className={dashboardStyle.chartPanel}>
              <span className={dashboardStyle.chartTitle}>Num request by day</span>
              {this.state.requestByDay &&
                <Line
                  data={this.state.requestByDay}
                  width={this.state.windowWidth}
                  height={300}
                />}
            </div>
          </div>}
        {this.state.optionselect === 2 && <div className={dashboardStyle['']}>
          <div className={dashboardStyle['three-numbers']}>
            <div><h2>{this.props.users.list ? this.props.users.list.length : 0}</h2><p>Users</p></div>
            <div><h2>{this.props.microservices.list ? this.props.microservices.list.length: 0}</h2><p>Microservices</p></div>
            <div><h2>{this.props.endpoints.list ? this.props.endpoints.list.length : 0}</h2><p>Endpoints</p></div>
          </div>
          <div className={dashboardStyle['two-numbers']}>
            <div><h2>{this.props.stadistics.countRequestToday ? this.props.stadistics.countRequestToday.count : 0}</h2><p>Requests today</p></div>
            <div><h2>{this.props.stadistics.countRequestLastWeek ? this.props.stadistics.countRequestLastWeek.count : 0}</h2><p>Requests last week</p></div>
          </div>
          <hr></hr>
          <div className={dashboardStyle['countries-list']}>
            {countries}
          </div>
        </div>}
        </div>
      </div>
    );
  }

}

DashboardView.propTypes = {
  getStadistics: PropTypes.func,
  getMicroservice: PropTypes.func,
  getUsers: PropTypes.func,
  getEndpoints: PropTypes.func,
  stadistics: PropTypes.object,
  users: PropTypes.object,
  endpoints: PropTypes.object,
  microservices: PropTypes.object,
};

export default DashboardView;
