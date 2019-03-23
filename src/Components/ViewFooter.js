import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    justifyContent: 'center'
  },
  footer:{
    width: "100%",
    position:"fixed",
    bottom: "0px",
    left: "0px",
    marginBottom:20
  },
  h1:{
    fontSize:11,
    margin:0,
    padding:0,
    display:"block",
    width:"100%",
    textAlign:"center",
  },
};

function ViewFooter(props) {
  const { classes } = props;
  return (
    <div>
      <div  container="true" justify="center" className={classes.footer}>
        <div className={classes.h1}>
          DESARROLLO Y PROGRAMANCIÓN
          <br/><b>ProgramandoWeb.net</b>
        </div>
      </div>
    </div>
  );
}

ViewFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewFooter);
