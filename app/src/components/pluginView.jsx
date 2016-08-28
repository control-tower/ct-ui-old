import React, { PropTypes } from 'react';

class PluginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      pluginUpdate: null,
    };
  }

  componentWillMount() {
    this.props.getPlugins();
  }

  actions = [
    { label: 'Cancel', onClick: this.cancel.bind(this) },
    { label: 'Ok', onClick: this.changeActive.bind(this) },
  ];

  toggleActivePlugin(plugin, newState) {
    this.setState({ pluginUpdate: Object.assign({}, plugin, { active: newState }), showDialog: true });
  }

  cancel() {
    this.setState({ pluginUpdate: null, showDialog: false });
  }

  changeActive() {
    this.props.updatePlugin(this.state.pluginUpdate._id, { active: this.state.pluginUpdate.active });
    this.setState({ pluginUpdate: null, showDialog: false });
  }

  render() {
    const plugins = [];
    return (
      <div>
      </div>
    );
  }

}

PluginView.propTypes = {
  getPlugins: PropTypes.func,
  updatePlugin: PropTypes.func,
  plugins: PropTypes.array
};

export default PluginView;
