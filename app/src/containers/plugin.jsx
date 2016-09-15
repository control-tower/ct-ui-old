import { connect } from 'react-redux';
import { getPlugins, updatePlugin, flushCache } from '../actions/plugins';

import Plugin from '../components/pluginView';

const mapStateToProps = (state) => ({
  plugins: state.plugins.list,
});

const mapDispatchToProps = (dispatch) => ({
  getPlugins: () => dispatch(getPlugins()),
  updatePlugin: (id, plugin) => dispatch(updatePlugin(id, plugin)),
  flushCache: () => dispatch(flushCache()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Plugin);
