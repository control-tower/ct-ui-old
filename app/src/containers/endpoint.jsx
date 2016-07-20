import { connect } from 'react-redux';

import Endpoint from '../components/endpointView';
import { getEndpoints } from '../actions/endpoints';

const mapStateToProps = (state) => ({
  endpoints: state.endpoints,
});

const mapDispatchToProps = (dispatch) => ({
  getEndpoints: () => dispatch(getEndpoints()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Endpoint);
