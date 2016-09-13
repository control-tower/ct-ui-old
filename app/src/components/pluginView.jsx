import React, { PropTypes } from 'react';
import classnames from 'classnames';
import layoutContentStyle from '../../styles/layout/l-content.scss';
import cardListStyle from '../../styles/components/c-card-list.scss';
import modalQuestionStyle from '../../styles/components/c-modal-question.scss';
import buttonStyle from '../../styles/components/c-button.scss';

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
          <div className={layoutContentStyle['card-padding']} key={index}>
            <div key={index} className={cardListStyle['c-card-list']}>
              <button
                type="button"
                className={cardListStyle['button-refresh']}
              >
              Flush cache
              </button>
              <div className={cardListStyle['card-title']}>
                <h2>
                  {plugin.name}
                </h2>
              </div>
              <div className={cardListStyle['card-main']}>
                <h3>File/module: {plugin.mainFile}</h3>
              </div>
              <div className={cardListStyle['card-button-contain']}>
                <button>Edit</button>
                  {plugin.active && <button onClick={() => this.toggleActivePlugin(plugin, false)}>Desactivate</button>}
                  {!plugin.active && <button onClick={() => this.toggleActivePlugin(plugin, true)}>Activate</button>}
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div className={[layoutContentStyle['l-content'], layoutContentStyle['-list-card']].join(' ')}>
        {this.state.showDialog &&
          <div
            onClick={() => this.cancel(this)}
            className={modalQuestionStyle.backgroundcolor}
          >
            <div
              className={classnames(modalQuestionStyle['c-modal-question'],
              this.state.showDialog ? modalQuestionStyle['-open'] : null)}
            >
              <h3>
                Sure that you want change the state of the plugin?
                <div>
                  <button
                    className={classnames(buttonStyle['c-button'], buttonStyle['-basic'], buttonStyle['-small-table'])}
                    type="button"
                    onClick={() => this.cancel(this)}
                  >
                    Cancel
                  </button>
                  <button
                    className={classnames(buttonStyle['c-button'], buttonStyle['-basic'], buttonStyle['-small-table'])}
                    type="button"
                    onClick={() => this.changeActive(this)}
                  >
                    Acept
                  </button>
                </div>
              </h3>
            </div>
          </div>
        }
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
