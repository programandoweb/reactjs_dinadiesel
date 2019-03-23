import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Animated} from "react-animated-css";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  bigAvatar: {
    width: 300,
    height: 300,
    position: "absolute",
    top: "50%",
    left:"50%",
    marginTop: "-150px",
    marginLeft:"-150px",
  },
  h1:{
    fontSize:10,
    margin:0,
    padding:0,
    display:"block",
    width:"100%",
    textAlign:"center",
  },
  footer:{
    width: "100%",
    position:"fixed",
    bottom: "0px",
    left: "0px",
    marginBottom:20
  },
});

function  ViewSplashscreen(props){
  const { classes } = props;
  return(
    <div className="fullscreen">
      <Animated animationIn="bounceInLeft" animationOut="flash" isVisible={true} className="fullscreen" >
          <Avatar alt="Dinadiesel" src="images/logo-1-1.png" className={classes.bigAvatar} />
      </Animated>
      <div  container="true" justify="center" className={classes.footer}>
        <div className={classes.h1}>
          DESARROLLO Y PROGRAMANCIÓN
          <br/><b>ProgramandoWeb.net</b>
        </div>
      </div>
    </div>
  )
}

ViewSplashscreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(theme)(ViewSplashscreen);
