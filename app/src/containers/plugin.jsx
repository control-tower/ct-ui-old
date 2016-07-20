import { connect } from 'react-redux';
import { getPlugins, updatePlugin } from '../actions/plugins';

import Plugin from '../components/pluginView';

const mapStateToProps = (state) => ({
  plugins: state.plugins.list,
});

const mapDispatchToProps = (dispatch) => ({
  getPlugins: () => dispatch(getPlugins()),
  updatePlugin: (id, plugin) => dispatch(updatePlugin(id, plugin)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Plugin);
