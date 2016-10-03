import { connect } from 'react-redux';
import { getStadistics } from '../actions/stadistics';
import { getUsers } from '../actions/users';
import { getEndpoints } from '../actions/endpoints';
import { getMicroservices } from '../actions/microservices';
import Dashboard from '../components/dashboardView';

const mapStateToProps = (state) => ({
  stadistics: state.stadistics,
  users: state.users,
  endpoints: state.endpoints,
  microservices: state.microservices,
});

const mapDispatchToProps = (dispatch) => ({
  getStadistics: (from, to) => dispatch(getStadistics(from, to)),
  getMicroservice: () => dispatch(getMicroservices()),
  getEndpoints: () => dispatch(getEndpoints()),
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
