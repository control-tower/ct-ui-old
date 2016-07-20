import { connect } from 'react-redux';

import Microservice from '../components/microserviceView';
import { getMicroservices } from '../actions/microservices';

const mapStateToProps = (state) => ({
  microservices: state.microservices,
});

const mapDispatchToProps = (dispatch) => ({
  getMicroservices: () => dispatch(getMicroservices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Microservice);
