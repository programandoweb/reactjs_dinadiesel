import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import pink from '@material-ui/core/colors/pink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding,faMapMarkerAlt,faPhoneVolume,faShieldAlt,faHome, } from '@fortawesome/free-solid-svg-icons';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  textWhite = {
    color: 'white',
    borderBottom:'solid 1px #fff',
  };

  appBar = {
    color: 'white',
    background:pink,
  };

  handleClick = (e) => {
    if(this.state.open){
			this.setState({open: false})
		}else{
			this.setState({open: true})
		}
	}

  handleClickParent = (variant)  =>  {
    this.props.handleClick(variant);
  }

  sideList = () =>{
    return(
      <div>
        <List>
        <ListItemLink href="#" button key="0" onClick={()=>this.handleClickParent("Home")}>
          <ListItemIcon>
            <FontAwesomeIcon className='buttom-colors' icon={faHome} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemLink>
          <ListItemLink href="#" button key="1" onClick={()=>this.handleClickParent("Nosotros")}>
            <ListItemIcon>
              <FontAwesomeIcon className='buttom-colors' icon={faBuilding} />
            </ListItemIcon>
            <ListItemText primary="Nosotros" />
          </ListItemLink>
          <ListItemLink href="#" button key="2" onClick={()=>this.handleClickParent("Ubicacion")}>
            <ListItemIcon>
              <FontAwesomeIcon className='buttom-colors' icon={faMapMarkerAlt} />
            </ListItemIcon>
            <ListItemText primary="Ubicación" />
          </ListItemLink>
          <ListItemLink href="#" button key="3" onClick={()=>this.handleClickParent("Contacto")}>
            <ListItemIcon>
              <FontAwesomeIcon className='buttom-colors' icon={faPhoneVolume} />
            </ListItemIcon>
            <ListItemText primary="Contactos" />
          </ListItemLink>
          <ListItemLink href="#" button key="4"  onClick={()=>this.handleClickParent("CerrarSesion")}>
            <ListItemIcon>
              <FontAwesomeIcon className='buttom-colors' icon={faShieldAlt} />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItemLink>
        </List>
      </div>
    )
  }

  render(){
    return(
      <div>
        <AppBar position="fixed" style={{backgroundColor: "#C51162"}}>
          <Toolbar>
            <IconButton
              className="menuButton"
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <div>DINA DIESEL</div>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={this.state.open} onClose={this.handleClick}>
           <div tabIndex={0} role="button" onClick={this.handleClick} onKeyDown={this.handleClick}>
              {this.sideList()}
           </div>
        </Drawer>
      </div>
    )
  }
}
export default Header;
