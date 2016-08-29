import React, { PropTypes } from 'react';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import cardListStyle from '../../styles/components/c-card-list.scss';

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
    if (this.props.plugins) {
      this.props.plugins.forEach((plugin, index) => {
        plugins.push(
          <div key={index} className={cardListStyle['c-card-list']}>
            <div className={cardListStyle['card-title']}>
              <h2>
                {plugin.name}
              </h2>
            </div>
          </div>
        );
      });
    }
    return (
      <div className={[layoutContentStyle['l-content'], layoutContentStyle['-list-card']].join(' ')}>
        {plugins}
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
