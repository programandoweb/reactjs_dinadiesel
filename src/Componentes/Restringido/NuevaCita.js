import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
let subserviciosfinal = []
let mantenimientos = []


class SimpleModalLogin extends React.Component {
  _isMounted = false;
  _isMounted1 = false;
  _isMounted2 = false;
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
      SubServicios:"",
      ClassNameServicios:false,
      div_servicios:"d-none",
      ClassNameSubServicios:false,
      div_subservicios:"d-none",
      ClassNameSubServiciosFinal:false,
      div_subserviciosFinal:"d-none",
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
      this.MakeSubServiciosFinal();
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
    this.MakeSubServicios(event.target.value);
  }

  setSubServicios  = (event)  =>{
    this.MakeSubServiciosFinal(event.target.value);
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
    subservicios = []
    for (const [index,value] of items.subservicios.entries()) {
      if(parent>0){
        if(value.servicio_id===parent){
          subservicios.push(<option key={index} value={value.id}>{value.sub_servicio}</option>)
        }
      }else{
        subservicios.push(<option key={index} value={value.id}>{value.sub_servicio}</option>)
      }
    }
    if(this._isMounted1 === false){

    }else{
      if(subservicios.length>0){
        this.setState({
          ClassNameSubServicios:true,
          div_subservicios:"d-block"
        })
      }else{
        this.setState({
          ClassNameSubServicios:false,
          div_subservicios:"d-none"
        })
      }
      this.setState({ SubServicios: subservicios });
    }
    this._isMounted1 = true;
  }

  MakeSubServiciosFinal=(parent)=>{
    subserviciosfinal = []
    for (const [index,value] of items.subserviciosfinal.entries()) {
      if(parent>0){
        if(value.parent_id===parent){
          subserviciosfinal.push(<option key={index} value={value.servicio_id}>{value.sub_servicio}</option>)
        }
      }else{
        subserviciosfinal.push(<option key={index} value={value.servicio_id}>{value.sub_servicio}</option>)
      }
    }
    if(this._isMounted2 === false){

    }else{
      if(subserviciosfinal.length>0){
        this.setState({
          ClassNameSubServiciosFinal:true,
          div_subserviciosFinal:"d-block"
        })
      }else{
        this.setState({
          ClassNameSubServiciosFinal:false,
          div_subserviciosFinal:"d-none"
        })
      }
      this.setState({ SubServiciosFinal: subserviciosfinal });
    }
    this._isMounted2 = true;
  }

  MakeMantenimientos=(parent)=>{
    mantenimientos=[]
    // Object.entries(items.subservicios.mantenimientos).map(function(item, i){
    //   mantenimientos.push(
    //     <div  key={i}><Checkbox
    //                     name="mantenimientos[]"
    //                     value={item[1].servicio}/>
    //                     {item[1].servicio}
    //     </div>)
    //   return i;
    // })
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
                <option value="">Seleccione el Modelo</option>
                {modelos}
              </select>
              <select className="custom-select mb-2" name="servicios" onChange={this.setServicios}>
                <option value="">Seleccione el Servicio</option>
                {servicios}
              </select>
              <Fade in={this.state.ClassNameSubServicios}>
                <div className={this.state.div_subservicios}>
                  <select className="custom-select mb-2" name="subservicios" onChange={this.setSubServicios}>
                    <option value="">Seleccione el SubServicio</option>
                    {subservicios}
                  </select>
                </div>
              </Fade>
              <Fade in={this.state.ClassNameSubServiciosFinal}>
                <div className={this.state.div_subserviciosFinal}>
                  <select className="custom-select mb-2" name="subserviciosfinal" onChange={this.setSubServiciosFinal}>
                    <option value="">Seleccione el SubServicio Final</option>
                    {subserviciosfinal}
                  </select>
                </div>
              </Fade>
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
