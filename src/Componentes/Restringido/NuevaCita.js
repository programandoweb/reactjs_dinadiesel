import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Fade from '@material-ui/core/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import {apiRest} from '../../ApiRest';

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

let items   = {}
let marcas  = []
let modelos = []
let servicios = []
let subservicios = []
let mantenimientos = []


class SimpleModalLogin extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
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
      checkedA: true,
      modelos:[],
      modal:false,
    });


    //localStorage.clear();

    if(this._isMounted === false){
      items   = JSON.parse(localStorage.getItem('MCitas'));
      setTimeout(() => {this.setState({opened:false})},1000);
      this.MakeMarcas();
      this.MakeModelos(0);
      this.MakeServicios();
      this.MakeSubServicios();
      this.MakeMantenimientos();
      this._isMounted = true;
    }
  }

  handleClickParent = (variant)  =>  {
    this.props.handleClick(variant);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeSetModelos = event => {
    this.MakeModelos(event.target.value);
  };

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  submit= (event)=>{

    event.preventDefault();
    let data_post = {}

    for(let a=0;a<event.target.length;a++){
      //console.log(event.target[a].name)
      if (event.target[a].tagName === "INPUT") {
        if (event.target[a].type === "text") {
          data_post[event.target[a].name] = event.target[a].value
        }else if(event.target[a].type === "checkbox"){
          if(event.target[a].checked){
              data_post[event.target[a].name] = event.target[a].value
          }
        }
      }else{
        data_post[event.target[a].name] = event.target[a].value
      }
    }
    data_post.action =  "NuevaCita";
    data_post.Key    =  localStorage.getItem('Key');

    apiRest(this.props.globalprops.ApiRest,data_post,{  "store":"Citas",
                                                        "props":this.props.globalprops,
                                                        "before":this.props.handleClickModal,
                                                        "content":localStorage,
                                                        "callback":(message)=>{
                                                        this.setState({ Message: message });
                                                    }});

    this.handleClickParent("Home");

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

  MakeMarcas=()=>{
    marcas = []
    for (const [index,value] of items.marcas.entries()) {
      marcas.push(<option key={index} value={value.id}>{value.marca}</option>)
    }
  }

  MakeModelos=(parent,state)=>{
    modelos = []
    for (const [index,value] of items.modelos.entries()) {
      if(parent>0){
        if(value.marca_id===parent){
          modelos.push(<option key={index} value={value.modelo_id}>{value.modelo}</option>)
        }
      }else{
        modelos.push(<option key={index} value={value.modelo_id}>{value.modelo}</option>)
      }
    }
    if(this._isMounted === false){

    }else{
        this.setState({ modelos: modelos });
    }
    this._isMounted = true;
  }

  MakeServicios=(parent)=>{
    servicios = []
    for (const [index,value] of items.servicios.entries()) {
      servicios.push(<option key={index} value={value.id}>{value.servicio}</option>)
    }
  }

  MakeSubServicios=(parent)=>{
    subservicios=[]
    Object.entries(items.subservicios.servicios).map(function(item, i){
      subservicios.push(
        <div  key={i}>
          <Checkbox
            name={"servicio["+i+"]"}
            value={item[1].servicio}
          />
          {item[1].servicio}
        </div>)
      return i;
    })
  }

  MakeMantenimientos=(parent)=>{
    mantenimientos=[]
    Object.entries(items.subservicios.mantenimientos).map(function(item, i){
      mantenimientos.push(
        <div  key={i}><Checkbox
                        name="mantenimientos[]"
                        value={item[1].servicio}/>
                        {item[1].servicio}
        </div>)
      return i;
    })
  }

  render() {
    //handleOpenGenerico
    const { classes } = this.props;
    const { modelos } = this.state;
    return (
      <div className="mt-5 pt-5">
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="h6" className="Montserrat">
            SOLICITUD DE CITAS
          </Typography>
          <Typography variant="caption">
            Las solicitudes están sujetas a la disponibilidad de DINADIESEL,
            una vez realice la solicitud, le será notificado sobre el día asignado.
          </Typography>
            <form onSubmit={this.submit}>
              <select className="custom-select mb-2" name="marca" onChange={this.changeSetModelos}>
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
              <div className="mt-0 mb-3">
                <input type="text" maxLength="7" name="placa" placeholder="Placas" className="form-control"/>
              </div>
              <div className="mt-3 mb-3">
                <Fade in={this.state.ClassNameServicios}>
                  <div className={this.state.div_servicios}>

                      {
                        subservicios
                      }

                  </div>
                </Fade>
                <Fade in={this.state.ClassNameMantenimientos}>
                  <div className={this.state.div_mantenimientos}>

                      {
                        mantenimientos
                      }

                  </div>
                </Fade>
                <Fade in={this.state.ClassNameReparaciones}>
                  <div  className={this.state.div_reparaciones}>

                      reparaciones

                  </div>
                </Fade>
                <Fade in={this.state.ClassNameRepuestos}>
                  <div  className={this.state.div_repuestos}>

                      Repuestos

                  </div>
                </Fade>
              </div>
              <div className="separator-2"></div>
              <Button size="small" variant="contained" color="primary" type="submit">
                Solicitar <FontAwesomeIcon className='ml-5'  icon={faLock} />
              </Button>
              <Button size="small"  color="primary" onClick={()=>this.handleClickParent("Home")}>
                CANCELAR
              </Button>
              <div className="separator"></div>
              <div className="response">
                {this.state.Message}
              </div>
            </form>
        </div>
      </div>
    )
  }
}

SimpleModalLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(SimpleModalLogin);

export default SimpleModalWrapped;
