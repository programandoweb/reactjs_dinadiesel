import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class Promociones extends React.Component{
  textWhite = {
    color: 'white',
    borderBottom:'solid 1px #fff'
  };
  imageResponsive = {
    width: '100%',
  };
  root= {
    width: '100%',
    maxWidth: 360,
  };

  images = {  src:  [   "images/uploads/burgerking.jpg",
                        "images/uploads/cars.jpg",
                        "images/uploads/muebles.jpg"
                    ],
              label:[   "Burger King BlackDay",
                        "Sal Manejando tu carro nuevo",
                        "Ofertas de Locuras"
                    ],
  }


  render(){
    return(
      <div style={this.root}>
        <List dense>
          {[0].map(value => (
            <ListItem key={value}>
              <img style={this.imageResponsive}  alt={ this.images.label[value] } src={ this.images.src[value] }  />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}
export default Promociones;
