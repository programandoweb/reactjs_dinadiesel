import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MaterialUIForm from 'material-ui-form';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
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

class SimpleModalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      Message:"",
    });
  }

  submit = (values) => {
    values.action = "LoginUser";
    values.Key    = this.props.Key;
    apiRest(this.props.ApiRest,values,{ "store":"User",
                                        "props":this.props,
                                        "before":this.props.myClickLoginExitoso,
                                        "content":localStorage,
                                        "callback":(message)=>{
                                        this.setState({ Message: message });
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
              INICIAR SESIÓN
            </Typography>
            <Typography variant="caption">
              Sus datos están protegidos, nunca serán compartido con terceros.
            </Typography>
              <MaterialUIForm onSubmit={this.submit}>
                <TextField
                  required
                  label="Celular"
                  type="tel"
                  name="telefono"
                  value="3045382899"
                />
                <TextField
                  required
                  label="Password"
                  type="password"
                  name="password"
                  value=""
                />
                <div className="separator-2"></div>
                <Button size="small" variant="contained" color="primary" type="submit">
                  Ingresar <FontAwesomeIcon className='ml-5'  icon={faLock} />
                </Button>
                <Button size="small"  color="primary" onClick={this.props.myClickLogin}>
                  CANCELAR
                </Button>
              </MaterialUIForm>
              <div className="separator"></div>
              <div className="response">
                {this.state.Message}
              </div>
          </div>
        </Modal>
      </div>
    )
  }
}
SimpleModalLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(SimpleModalLogin);

export default SimpleModalWrapped;
