/*Dependencias*/
import React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles  } from '@material-ui/core/styles';
import {apiRest} from './ApiRest'

/*Componentes*/
import Login from './Componentes/Usuarios/Login';
import Nosotros from './Componentes/Nosotros';
import Contacto from './Componentes/Contacto';
import NuevaCita from './Componentes/Restringido/NuevaCita';
import Ubicacion from './Componentes/Ubicacion';
import Page404 from './Componentes/Basico/Page404';
import Header from './Componentes/Basico/Header';
import Footer from './Componentes/Basico/Footer';
import Body from './Componentes/Basico/Body';

import ViewFooter from './Components/ViewFooter'
import ViewModalRegister from './Components/ViewModalRegister'
import ViewModalLogin from './Components/ViewModalLogin'
import ViewModalGenerico from './Components/ViewModalGenerico'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {

  },
  logo:{
    width:"100%",
    paddingTop:"30%",
    paddingBottom:10,
  },
  separator:{
    paddingTop:30,
    textAlign:"center",
  },
  separator1:{
    paddingTop:8,
    textAlign:"center",
  },
  margin: {
   margin: theme.spacing.unit,
  },
  button2:{
    fontSize:10,
    fontWeight:"bold"
  },
});


class MainRoute extends React.Component {
  constructor(props) {
    super(props);
    var logeado   = false;

    if(this.checkUser()){
      logeado=true;
    }
    this.state = ({
      isLoggedIn: logeado,
      User:JSON.parse(localStorage.getItem('User')),
      TypeAlert:"",
      content:<Body globalprops={this.props} handleClick={this.handleClickMenu} handleClickModal={this.handleOpenGenerico}/>,
      MRegister:false,
      MLogin:false,
      MGenerico:false,
    });
    if(localStorage.getItem('User')==='[object Object]'){
      localStorage.clear();
    }

    if(localStorage.getItem('Key')=== null && this.state.User){
      apiRest(this.props.ApiRest + "Key",{usuario_id:this.state.User.usuario_id},{"store":"Key","content":localStorage});
		}else if(localStorage.getItem('Key')=== null && !this.state.User){
      apiRest(this.props.ApiRest + "Key",{usuario_id:0},{"store":"Key","content":localStorage});
      //apiRest(this.props.ApiRest + "Key",{usuario_id:this.state.User.usuario_id},{"store":"Key","content":localStorage});
    }

  }

  static protoTypes = {
    theme: PropTypes.object.isRequired
  };

  checkUser=()=>{
    var User      =   JSON.parse(localStorage.getItem('User'));
    if(!User){
      return false;
    }else{
      return true;
    }
  }

  content=(variant)=>{
    switch(variant){
      case "Home":
      return <Body globalprops={this.props} handleClick={this.handleClickMenu} handleClickModal={this.handleOpenGenerico}/>;
      case "Login":
      return <Login/>;
      case "CerrarSesion":
      apiRest(this.props.ApiRest,{"action":"closeSession","Key":localStorage.getItem('Key')},{});
      localStorage.removeItem('User');
      localStorage.clear();
      return;
      case "Contacto":
      return <Contacto/>;
      case "nuevaCotizacion":
      return <NuevaCita globalprops={this.props} handleClick={this.handleClickMenu} handleClickModal={this.handleOpenGenerico}/>;
      case "nuevaCita":
      return <NuevaCita globalprops={this.props} handleClick={this.handleClickMenu} handleClickModal={this.handleOpenGenerico}/>;
      case "Ubicacion":
      return <Ubicacion/>;
      case "Page404":
      return <Page404/>;
      case "Nosotros":
      return <Nosotros/>;
      default:
      return <Body globalprops={this.props} handleClick={this.handleClickMenu} handleClickModal={this.handleOpenGenerico}/>
    }
  }

  handleClickMenu=(variant)=>{
    this.setState({ content: this.content(variant) });
  }

  handleOpenLogin = () => {
    if(!this.state.MLogin){
        this.setState({ MLogin: true });
    }else{
        this.setState({ MLogin: false });
    }
  };

  handleOpen = () => {
    if(!this.state.MLogin){
        this.setState({ MRegister: true });
    }else{
        this.setState({ MRegister: false });
    }
  };

  handleCloseLogin = () => {
    if(JSON.parse(localStorage.getItem('User'))){
        this.setState({ User: JSON.parse(localStorage.getItem('User')),
                        });
    }else{
      this.setState({ MLogin: false });
    }
  };

  handleClose = () => {
    if(JSON.parse(localStorage.getItem('User'))){
        this.setState({ User: JSON.parse(localStorage.getItem('User')),
                        });
    }else{
      this.setState({ MRegister: false });
    }
  };

  handleLoginExitoso = () => {
    //this.setState({ MRegister: false });
    var User  = JSON.parse(localStorage.getItem('User'));
    this.setState({ MGenerico: true,
                    TypeAlert:"Exito",
                    Message: "Hola "+ User.nombres +", bienvenido a Dina Diesel.",
                    MLogin: false,
                    User: JSON.parse(localStorage.getItem('User')),
                    isLoggedIn:true,
                    content:<Body globalprops={this.props} handleClick={this.handleClickMenu} handleClickModal={this.handleOpenGenerico}/>,
                  });

  };

  handleOpenGenerico = (message,typeAlert) => {
    this.setState({
                    MGenerico: true,
                    Message: message,
                    TypeAlert:(typeAlert)?typeAlert:'',
                    });
  };

  handleCloseGenerico = () => {
    this.setState({ MGenerico: false });
  };

  render() {
    const {theme}   =   this.props;
    if(!this.checkUser()){
      const { classes } = this.props;
      return(
        <div>
          <ViewModalGenerico
            MState={this.state}
            MGenerico={this.state.MGenerico}
            theme={this.props.theme}
            myClickCloseGenerico={this.handleCloseGenerico}/>
          <ViewModalRegister ApiRest={this.props.ApiRest} MRegister={this.state.MRegister} Key={localStorage.getItem('Key')} theme={this.props.theme} myClick={this.handleClose} myClickRegistroExitoso={this.handleRegistroExitoso} />
          <ViewModalLogin ApiRest={this.props.ApiRest} MRegister={this.state.MLogin} Key={localStorage.getItem('Key')} theme={this.props.theme} myClickLogin={this.handleCloseLogin} myClickLoginExitoso={this.handleLoginExitoso} />
          <Grid container className={classes.root} justify="center" alignItems="center" direction="row">
            <Grid item xs={12}>
              <Grid container justify="center" alignItems="center" direction="row">
                <Grid item xs={10} >
                  <img className={classes.logo} alt="Dinadiesel" src="images/big-margensuperior-logo.png" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" alignItems="center" direction="row">
                <Grid item xs={12} className={classes.separator}>
                  <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.handleOpenLogin}>
                    INICIAR SESIÓN
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10} className={classes.separator1}>
              <Button size="small" color="secondary" className={classes.button2}  onClick={this.handleOpen}>
                REGISTRARSE EN DINADIESEL
              </Button>
            </Grid>
          </Grid>
          <ViewFooter/>
        </div>
      )
    }else{
      return (
        <div className="MainRoute">
          <ViewModalGenerico
            MState={this.state}
            MGenerico={this.state.MGenerico}
            theme={this.props.theme}
            myClickCloseGenerico={this.handleCloseGenerico}/>
          <Header theme={theme} handleClick={this.handleClickMenu}/>
            <div className="Body">
              {this.state.content}
            </div>
          <Footer theme={theme} props={null} />
        </div>
      )
    }
  }
}
export default withStyles(styles, { withTheme: true })(MainRoute);
