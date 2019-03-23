import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MaterialUIForm from 'material-ui-form';
import TextField from '@material-ui/core/TextField';
import {apiRest} from '../ApiRest';


function getModalStyle() {
  const top = 1 ;
  const left = 2;

  return {
    top: `${top}%`,
    left: `${left}%`
  };
}

const styles = theme => ({
  paper: {
    // position: 'absolute',
    // width: "76%",
    height:"84%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      Message:"",
    });
  }

  submit = (values) => {
    values.action = "RegisterUser";
    values.Key    = this.props.Key;
    apiRest(this.props.ApiRest,values,{ "store":"User",
                                        "content":localStorage,
                                        "before":this.props.myClickRegistroExitoso,
                                        "Props":this.props,
                                        "callback":(message)=>{
                                        this.setState({ Message: message})
                                      }});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.MRegister}
        >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="h6" className="Montserrat">
                REGISTRO
              </Typography>
              <Typography variant="caption">
                Sus datos están protegidos, nunca serán compartido con terceros.
              </Typography>
                <MaterialUIForm onSubmit={this.submit}>
                  <TextField
                    label = "Nombre y Apellido"
                    type="text"
                    name="nombres"
                    value="JORGE MENDEZ"
                  />
                  <TextField
                    label="Correo electrónico"
                    type="email"
                    name="email"
                    data-validators="isEmail"
                    value="info@programandoweb.net"
                  />
                  <TextField
                    label="Celular"
                    type="tel"
                    name="telefono"
                    value="3115000926"
                  />
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value="123456"
                  />
                  <div className="separator"></div>
                  <Button size="small" variant="contained" color="primary" type="submit">
                    REGISTRAR <AddIcon />
                  </Button>
                  <Button size="small"  color="primary" onClick={this.props.myClick}>
                    CANCELAR
                  </Button>
                </MaterialUIForm>
                <div className="separator-2"></div>
                <div className="response">
                  {this.state.Message}
                </div>
            </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
