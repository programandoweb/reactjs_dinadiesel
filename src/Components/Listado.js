import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

class Listado extends React.Component{
  textWhite = {
    color: 'white',
    borderBottom:'solid 1px #fff'
  };
  fontPrice = {
    fontSize:"11px",
    fontWeight:"bold",
    marginRight:"15px"
  };
  ubicacion = {
    fontSize:"9px",
  };
  root= {
    width: '100%',
    maxWidth: 360,
  };

  texto_prueba = {
    var1:'Balón de Fútbol Americano',
    var2:'Ubicación: 2Km ',
    var3:'Bello - Antioquia'
  }

  images = {  src:  [   "images/uploads/burgerking.jpg",
                        "images/uploads/cars.jpg",
                        "images/uploads/muebles.jpg",
                        "images/uploads/15426295620347.jpg"
                    ],
              label:[   "Burger King BlackDay",
                        "Sal Manejando tu carro nuevo",
                        "Ofertas de Locuras",
                        "Ofertas de Locuras"
                    ],
  }

  render(){
    return(
      <div style={this.root}>
        <List dense>
          {[0, 1, 2, 3].map(value => (
            <ListItem key={value} button>
              <Avatar alt="Remy Sharp" src={ this.images.src[value] } />
              <ListItemText>
                <div>{this.texto_prueba.var1}</div>
                <div style={this.ubicacion}>
                  {this.texto_prueba.var2}
                  <b>
                    {this.texto_prueba.var3}
                  </b>
                </div>
              </ListItemText>
              <ListItemSecondaryAction style={this.fontPrice}>
                $22.500
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}
export default Listado;
