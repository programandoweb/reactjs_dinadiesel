import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MaterialUIForm from 'material-ui-form';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
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

    let data_post  =   {
      "action":"ListarCitas",
      "Key":localStorage.getItem('Key'),
    };

    this.state = ({
      age: '',
      name: 'hai',
      labelWidth: 0,
      Message:"",
      Marcas:"",
      Modelos:"",
      Servicios:"",
      ClassNameServicios:false,
      div_servicios:"d-none",
      ClassNameMantenimientos:false,
      div_mantenimientos:"d-none",
      ClassNameReparaciones:false,
      div_reparaciones:"d-none",
      ClassNameRepuestos:false,
      div_repuestos:"d-none",
    });

    apiRest(this.props.globalprops.ApiRest,data_post,{ "store":"MCitas",
                                        "props":this.props,
                                        "content":localStorage,
                                        "callback":null});

  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = (values) => {
    values.action = "LoginUser";
    values.Key    = this.props.Key;
    apiRest(this.props.ApiRest,values,{ "store":"User",
                                        "props":this.props,
                                        "content":localStorage,
                                        "callback":(message)=>{
                                          this.setState({ Message: message });
                                        }});
  }

  setServicios  = (event)  =>{
    this.setState({
      ClassNameServicios:false,
      div_servicios:"d-none",
      ClassNameMantenimientos:false,
      div_mantenimientos:"d-none",
      ClassNameReparaciones:false,
      div_reparaciones:"d-none",
      ClassNameRepuestos:false,
      div_repuestos:"d-none",
    });
    switch(event.currentTarget.value){
      case "servicios":
        this.setState({
          ClassNameServicios:true,
          div_servicios:"d-block",
        })
      break;
      case "mantenimientos":
        this.setState({
          ClassNameMantenimientos:true,
          div_mantenimientos:"d-block",
        })
      break;
      case "reparaciones":
        this.setState({
          ClassNameReparaciones:true,
          div_reparaciones:"d-block",
        })
      break;
      case "repuestos":
        this.setState({
          ClassNameRepuestos:true,
          div_repuestos:"d-block",
        })
      break;
      default:

      break;
    }
  }

  render() {

    let items = JSON.parse(localStorage.MCitas);
    let marcas = []
    let modelos = []
    let servicios = []
    let subservicios = []

    for (const [index,value] of items.marcas.entries()) {
      marcas.push(<option key={index} value={value.id}>{value.marca}</option>)
    }

    for (const [index,value] of items.modelos.entries()) {
      modelos.push(<option key={index} value={value.modelo_id}>{value.modelo}</option>)
    }

    for (const [index,value] of items.servicios.entries()) {
      servicios.push(<option key={index} value={value.id}>{value.servicio}</option>)
    }

    Object.entries(items.subservicios.servicios).map(function(item, i){
      subservicios.push(<span key={i}> {item[1].servicio} </span>)
      return i;
    })


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
              SOLICITUD DE CITAS
            </Typography>
            <Typography variant="caption">
              Las solicitudes están sujetas a la disponibilidad de DINADIESEL,
              una vez realice la solicitud, le será notificado sobre el día asignado.
            </Typography>
              <MaterialUIForm onSubmit={this.submit}>
                <select className="custom-select mb-2" name="marca">
                  <option value="">Seleccione la Marca</option>
                  {marcas}
                </select>
                <select className="custom-select mb-2" name="modelos">
                  <option value="">Seleccione la Modelo</option>
                  {modelos}
                </select>
                <select className="custom-select mb-2" name="servicios" onChange={this.setServicios}>
                  <option value="">Seleccione la Servicio</option>
                  {servicios}
                </select>
                <div className="mt-3 mb-3">
                  <Fade in={this.state.ClassNameServicios}>
                    <div className={this.state.div_servicios}>
                      <Paper elevation={1} className={classes.paper}>
                        {
                          subservicios
                        }
                      </Paper>
                    </div>
                  </Fade>
                  <Fade in={this.state.ClassNameMantenimientos}>
                    <div className={this.state.div_mantenimientos}>
                      <Paper elevation={1} className={classes.paper}>
                        mantenimientos
                      </Paper>
                    </div>
                  </Fade>
                  <Fade in={this.state.ClassNameReparaciones}>
                    <div  className={this.state.div_reparaciones}>
                      <Paper elevation={1} className={classes.paper}>
                        reparaciones
                      </Paper>
                    </div>
                  </Fade>
                  <Fade in={this.state.ClassNameRepuestos}>
                    <div  className={this.state.div_repuestos}>
                      <Paper elevation={1} className={classes.paper}>
                        Repuestos
                      </Paper>
                    </div>
                  </Fade>
                </div>
                <TextField
                  required
                  label="Celular"
                  type="tel"
                  name="telefono"
                  value="3045382899"
                />
                <div className="separator-2"></div>
                <Button size="small" variant="contained" color="primary" type="submit">
                  Solicitar <FontAwesomeIcon className='ml-5'  icon={faLock} />
                </Button>
                <Button size="small"  color="primary" onClick={this.props.myClickNuevaCita}>
                  CANCELAR
                </Button>
                <div className="separator"></div>
                <div className="response">
                  {this.state.Message}
                </div>
              </MaterialUIForm>
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
