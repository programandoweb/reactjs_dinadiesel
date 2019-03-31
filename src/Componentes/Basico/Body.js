import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Promociones from '../../Components/Promociones';
import Cotizaciones from '../../Components/Cotizaciones';

import Citas from '../../Components/Citas';
import Chat from '../../Components/Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding,faCalendarAlt,faHeadset,faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'

import pink from '@material-ui/core/colors/pink';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';

import {apiRest} from '../../ApiRest';

const styles = theme => ({
  root: {
    width: "100%",
    position:"fixed",
    bottom: "0px",
    left: "0px",
  },
  delete: {
    display:"none",
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 2,
    backgroundColor: pink[500],
  },
  fabGreen: {
    color: theme.palette.common.white,
  },
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{  padding: 0,
                                          maxHeight:"100%",
                                          paddingTop:"60px"
                                        }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Body extends React.Component {

  state = {
    value: 0,
  };

  bloques = {
    display:"block",
    width:"100%",
    height:"100%",
    color:"red",
    minHeight:"100%"
  };

  wfull = {
    display:"block",
    width:"100%",
  };

  bRight = {
    borderRight: "2px solid #f2f2f2",
  };

  nopadding = {
    padding:"0px"
  };

  maxheight = {
    maxheight:"480px",
    paddingTop:"50px",
    paddingBottom:"50px",
    overflow: "hidden"
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 0,
      MCita:false,
      inicio:true
    };
    let data_post  =   {
      "action":"ListarCitas",
      "Key":localStorage.getItem('Key'),
    };

    if(!localStorage.getItem('MCitas')){
      apiRest(this.props.globalprops.ApiRest,data_post,{  "store":"MCitas",
                                                          "props":this.props,
                                                          "content":localStorage,
                                                          "response":""});

    }
  }

  handleClickParent = (variant)  =>  {
    this.props.handleClick(variant);
  }

  handleChange = (event, value) => {
    this.setState({value : value })
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { value }           = this.state;
    const { classes, theme }  = this.props;
    const transitionDuration  = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
      {
        uri: 'nuevaCita',
        color: 'primary',
        className: classes.delete,
        icon: <AddIcon />,
      },
      {
        uri: 'nuevaCotizacion',
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
      },
      {
        uri: 'nuevaCita',
        color: 'secondary',
        className: classes.fab,
        icon: <AddIcon />,
      },
      {
        uri: 'nuevaCita',
        color: 'primary',
        className: classes.delete,
        icon: <AddIcon />,
      },
    ];
    return (
      <div style={this.bloques}>
        <SwipeableViews style={this.wfull} index={value}  onChange={this.handleChange}>
          {<TabContainer style={this.maxheight}><Promociones/></TabContainer>}
          {<TabContainer style={this.maxheight}><Cotizaciones globalprops={this.props.globalprops} handleClickModal={this.props.handleClickModal}/></TabContainer>}
          {<TabContainer style={this.maxheight}><Citas globalprops={this.props.globalprops} handleClickModal={this.props.handleClickModal}/></TabContainer>}
          {<TabContainer style={this.maxheight}><Chat/></TabContainer>}
        </SwipeableViews>
        {fabs.map((fab, index) => (
          <Zoom
            key={index}
            in={this.state.value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <div className="float-icon" onClick={()=>this.handleClickParent(fab.uri)}>
              <Fab className={fab.className} color={fab.color} >
                {fab.icon}
              </Fab>
            </div>
          </Zoom>
        ))}
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction style={this.bRight} index={value} className='buttom-content' label="Home" icon={<FontAwesomeIcon className='buttom-colors' icon={faBuilding} />} cols={2} />
          <BottomNavigationAction style={this.bRight} index={value} className='buttom-content' label="Cotiza" icon={<FontAwesomeIcon className='buttom-colors' icon={faFileInvoiceDollar} />} cols={2} />
          <BottomNavigationAction style={this.bRight} index={value} className='buttom-content' label="Citas" icon={<FontAwesomeIcon className='buttom-colors'  icon={faCalendarAlt} />} cols={2} />
          <BottomNavigationAction  index={value} className='buttom-content' label="Contacto" icon={<FontAwesomeIcon className='buttom-colors'  icon={faHeadset} />} cols={2} />
        </BottomNavigation>
      </div>
    );
  }
}

Body.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(Body);
