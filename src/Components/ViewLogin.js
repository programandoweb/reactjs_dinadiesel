import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MaterialUIForm from 'material-ui-form';
import Avatar from '@material-ui/core/Avatar';
import {Animated} from "react-animated-css";
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    justifyContent: 'center',
    padding:"15px"
  },
  typography: {
    useNextVariants: true,
  },
};

class ViewLogin extends React.Component {
  submit = (values, pristineValues) => {
    // get all values and pristineValues on form submission
  }

  customInputHandler = (value, { name }, event) => {
    // the form will update the field as usual, and then call this handler
    // if you want to have complete control of the field, change the "value" prop to "defaultValue"
  }

  customToggleHandler = (checked, { name, value }, event) => {
    // the form will update the field as usual, and then call this handler
    // if you want to have complete control of the field, change the "value" prop to "defaultValue"
  }
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root} >
        <Animated animationIn="bounceInLeft" animationOut="flash" isVisible={true} className="fullscreen logo-top" >
          <img className="logo-top pt-30" alt="Dinadiesel" src="images/big-margensuperior-logo.png"/>
        </Animated>
        <div className="separator"></div>
        <div className="btn-center">
          <Button variant="outlined" color="primary" className={classes.button}>
            Primary
          </Button>
        </div>
      </div>
    );
  }
}


ViewLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewLogin);
