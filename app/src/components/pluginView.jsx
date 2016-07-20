import React, { PropTypes } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  Button,
  FontIcon,
  Dialog,
} from 'react-toolbox';
import pluginStyle from '../../styles/plugin';
import generalStyle from '../../styles/general';

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
          <Card
            key={index}
            raised
            className={pluginStyle.card}
          >
            <CardTitle title={plugin.name} />
            <CardText>File/module: {plugin.mainFile}</CardText>
            <CardActions>
              <Button label="Edit" />
              {plugin.active && <Button label="Deactivate" icon="clear" className={pluginStyle.deactivate} onClick={() => this.toggleActivePlugin(plugin, false)} />}
              {!plugin.active && <Button label="Activate" icon="done" className={pluginStyle.activate} onClick={() => this.toggleActivePlugin(plugin, true)} />}
            </CardActions>
          </Card>
        );
      });
    }
    return (
      <div>
        <h2>
          <FontIcon value="extension" className={generalStyle.mainIcon} />
          Plugins
        </h2>
        {plugins}
        <Dialog
          actions={this.actions}
          active={this.state.showDialog}
          onEscKeyDown={() => this.cancel}
          onOverlayClick={() => this.cancel}
          title="Confirm"
        >
          <p>Sure that you want change the state of the plugin?</p>
        </Dialog>
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
