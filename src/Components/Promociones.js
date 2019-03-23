import React from 'react';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  bigAvatar: {
    width: "100%",
    position: "absolute",
    top: "20%",
    left:"0",
    marginTop: "-50px",
    marginLeft:"0px",
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

class Promociones extends React.Component{
  textWhite = {
    color: 'white',
    borderBottom:'solid 1px #fff'
  };
  imageResponsive = {
  };
  root= {
    width: '100%',
  };

  render(){
    //const { classes } = this.props;
    return(
      <div style={this.root}>
        <img className="img-resposive" src="images/happy_new_year.jpg" alt="Happy New Year" />
      </div>
    )
  }
}
export default  withStyles(theme)(Promociones);
