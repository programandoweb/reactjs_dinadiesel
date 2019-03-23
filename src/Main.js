import React , { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {apiRest} from './ApiRest'

/*Componentes*/
import Footer from './Components/Footer'
import Header from './Components/Header'
import ViewFooter from './Components/ViewFooter'
import ViewModalRegister from './Components/ViewModalRegister'
import ViewModalLogin from './Components/ViewModalLogin'
import ViewModalGenerico from './Components/ViewModalGenerico'

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

class Main extends Component {
  constructor(props) {
    super(props);
    var logeado = false;
    var User    = JSON.parse(localStorage.getItem('User'));
    if(User){
      logeado=true;
    }
    this.state = ({
      isLoggedIn: logeado,
      User:localStorage.getItem('User'),
      Splashscreen:false,
      MRegister:false,
      MLogin:false,
      MGenerico:false,
      Message:"",
      TypeAlert:"",
    });
    if(localStorage.getItem('User')==='[object Object]'){
      localStorage.clear();
    }
    if(localStorage.getItem('Key')=== null){
      apiRest(this.props.ApiRest + "Key",{},{"store":"Key","content":localStorage});
		}
  }

  handleOpenLogin = () => {
    if(!this.state.MLogin){
        this.setState({ MLogin: true });
    }else{
        this.setState({ MLogin: false });
    }
  };

  handleCloseSesion= () => {
    localStorage.clear();
    this.setState({ isLoggedIn: false });
  };

  handleCloseLogin = () => {
    if(JSON.parse(localStorage.getItem('User'))){
        this.setState({ User: JSON.parse(localStorage.getItem('User')),
                        });
    }else{
      this.setState({ MLogin: false });
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
                  });

  };

  handleOpen = () => {
    if(!this.state.MRegister){
        this.setState({ MRegister: true });
    }else{
        this.setState({ MRegister: false });
    }
  };

  handleClose = () => {
    this.setState({ MRegister: false });
    //this.setState({ MGenerico: true });
  };

  handleRegistroExitoso = () => {
    //this.setState({ MRegister: false });
    this.setState({ MRegister: false,
                    MGenerico: true,
                    TypeAlert:"Exito",
                    Message: "El Registro se he efectuado, puedes iniciar sesión"});
  };

  handleOpenGenerico = () => {
    this.setState({ MGenerico: true });
  };

  handleCloseGenerico = () => {
    this.setState({ MGenerico: false });
  };

  About = () =>{
    return(
      <div><h3>About</h3></div>
    )
  }

  Ubicacion = () =>{
    return(
      <div><h3>Ubicación</h3></div>
    )
  }

  Contacto = () =>{
    return(
      <div><h3>Contacto</h3></div>
    )
  }

  Home =  () =>{
    const { classes } = this.props;
    return (
      <div>
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
  }

  render() {
    var renderizar;
    if(!this.state.isLoggedIn){
      renderizar  = this.Home();
    }else{
      renderizar  =
                    <div>
                      <Header myClickClose={this.handleCloseSesion}/>
                      <Footer/>
                    </div>;
    }
    return(
      <div>
        <ViewModalGenerico
          MState={this.state}
          MGenerico={this.state.MGenerico}
          theme={this.props.theme}
          myClickCloseGenerico={this.handleCloseGenerico}/>
        {renderizar}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Main);
