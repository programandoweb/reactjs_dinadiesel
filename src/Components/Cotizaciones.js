import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

class Cotizaciones extends React.Component{

  images = {  src:  [   "images/uploads/cars.jpg",
                        "images/uploads/cars.jpg",
                    ],
              primary:[   "Camión H1",
                        "Toyota Dyna ",
                    ],
              secondary:[   "Mantenimiento de sistema eléctrico",
                            "Limpieza de inyectores ",
                    ],
            }

  render(){
    return (
      <div>
        <List dense>
          {[0,1,].map(value => (
            <ListItem key={value}>
              <Avatar>
                <ImageIcon />
              </Avatar>
              <ListItemText className="Separator"  primary={this.images.primary[value]} secondary={this.images.secondary[value]} />
            </ListItem>
          ))}
        </List>

      </div>
    )
  }
}

export default Cotizaciones
