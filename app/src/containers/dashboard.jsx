import { connect } from 'react-redux';
import { getStadistics } from '../actions/stadistics';
import Dashboard from '../components/dashboardView';

const mapStateToProps = (state) => ({
  stadistics: state.stadistics,
});

const mapDispatchToProps = (dispatch) => ({
  getStadistics: (from, to) => dispatch(getStadistics(from, to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
